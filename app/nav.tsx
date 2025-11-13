import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import ThemeChanger from "@/components/theme-changer";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import AppIcon from "@/public/app-icon.png";
import DefaultAvatar from "@/public/default-avatar.png";
import { SignOutButton } from "../components/signout-button";

export function Nav({ className }: { className?: string }) {
  const session = use(auth());
  const didSignin = !!session?.user;

  return (
    <header className={cn("hmf-padding", className)}>
      <div className="flex h-full justify-between">
        <Link
          href="/todo"
          className="flex flex-horizon items-center font-bold text-stone-700! dark:text-stone-500!"
        >
          <Image src={AppIcon} alt="main icon" width={32} height={32}></Image>
          <p>QuesTODO</p>
        </Link>
        <div className="flex items-center justify-between gap-1">
          <ThemeChanger />
          {didSignin ? (
            <div className="flex items-center gap-1">
              <div className="overflow-hidden rounded-full border sm:hidden">
                <Image
                  src={session?.user?.image || DefaultAvatar}
                  alt={session?.user?.name || "guest"}
                  width={24}
                  height={24}
                />
              </div>
              <SignOutButton />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
}
