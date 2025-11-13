"use client";

import { LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { logout } from "@/app/sign/sign.action";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const session = useSession();
  if (!session?.data?.user) redirect("/");
  return (
    <form action={logout}>
      <Button className="hidden sm:block" variant={"success"}>
        Sign out
      </Button>
      <Button className="sm:hidden" variant={"ghost"}>
        <LogOutIcon />
      </Button>
    </form>
  );
}
