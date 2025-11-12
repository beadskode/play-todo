import { redirect } from "next/navigation";
import { use } from "react";
import { auth } from "@/lib/auth";
import MemberProfile from "./member/member-profile";
import Ranking from "./ranking";

export default function Todo() {
  const session = use(auth());
  const didSignin = !!session?.user;
  if (!didSignin) redirect("/sign");

  return (
    <div className="@container flex h-full flex-col gap-2 md:flex-row">
      <div className="flex w-full flex-row gap-2 md:h-full md:w-70 md:flex-col">
        <MemberProfile />
        <Ranking userEmail={session.user.email ?? ""} />
      </div>
      <div className="main-container flex-1 text-center">TODO</div>
    </div>
  );
}
