import { redirect } from "next/navigation";
import { use } from "react";
import { auth } from "@/lib/auth";
import { MemberProfile } from "./member/member-profile";

export default function Todo() {
  const session = use(auth());
  const didSignin = !!session?.user;
  if (!didSignin) redirect("/");

  return (
    <div className="flex h-full w-full justify-between gap-3">
      <MemberProfile />
      <div className="main-container flex-1 text-center">TODO</div>
    </div>
  );
}
