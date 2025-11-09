import Image from "next/image";
import ThemeChanger from "@/components/theme-changer";
import { ListTodoIcon } from "lucide-react";
import Link from "next/link";

export function Nav() {
  let session:boolean = false;
  return (
    <header className="hmf-padding">
        <div className="flex justify-between">
          <div className="flex flex-horizon items-center font-bold text-stone-700">
            <Image src='/app-icon.png' alt='main icon' width={32} height={32}></Image>
            <p>QuesTODO</p>
          </div>
          <div className="flex items-center justify-between gap-5">
            <ThemeChanger />
            {!session ? <Link href="/">Login</Link> : <Link href="/">Logout</Link>}
            
          </div>
        </div>
    </header>
  )
}