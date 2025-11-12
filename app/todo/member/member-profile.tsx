import { MedalIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import DefaultAvatar from "@/public/default-avatar.png";

export default async function MemberProfile() {
  const session = await auth();
  if (!session?.user?.name) redirect("/sign");

  const { email, image } = session.user;

  const member = await prisma.member.findUnique({
    where: { email: email as string },
  });

  if (!member?.email) return <></>;

  return (
    <div className="main-container hidden h-70 text-center sm:block sm:w-60 md:w-full">
      <div className="h-full w-full place-content-center place-items-center">
        <div className="mb-4 overflow-hidden rounded-full border">
          <Image
            src={image || DefaultAvatar}
            alt="User Profile"
            width={80}
            height={80}
          />
        </div>
        <h1 className="font-bold text-xl">{member.nickname}</h1>
        <span className="text-gray-500 text-sm">{member.email}</span>
        <div className="mt-4 flex items-center gap-2 text-xl">
          <MedalIcon className="text-amber-500" size={24} /> {member.score}
        </div>
      </div>
    </div>
  );
}
