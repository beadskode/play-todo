import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import ThemeChanger from "@/components/theme-changer";
import { auth } from "@/lib/auth";
import { SignOutButton } from "../components/signout-button";

export function Nav() {
  const session = use(auth());
  const didSignin = !!session?.user;

  return (
    <header className="hmf-padding">
      <div className="flex justify-between">
        <div className="flex items-center font-bold flex-horizon text-stone-700">
          <Image
            src="/app-icon.png"
            alt="main icon"
            width={32}
            height={32}
          ></Image>
          <p>QuesTODO</p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <ThemeChanger />
          {didSignin ? (
            <div className="flex items-center gap-3">
              <div>{session.user?.name}</div>
              <SignOutButton />
            </div>
          ) : (
            <Link href="/api/auth/signin">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
