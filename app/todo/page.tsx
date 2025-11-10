import { redirect } from "next/navigation";
import { use } from "react";
import { SignOutButton } from "@/components/signout-button";
import { auth } from "@/lib/auth";
import { MemberProfile } from "./member/member-profile";

export default function Todo() {
  const session = use(auth());
  const didSignin = !!session?.user;
  if (!didSignin) redirect("/");

  return (
    <div className="flex justify-between w-full h-full gap-3 hmf-padding">
      <MemberProfile />
      <SignOutButton />
      <div className="flex-1 text-center main-container">TODO</div>
    </div>
  );
}
