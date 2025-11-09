import ThemeChanger from "@/components/theme-changer";
import { ListTodoIcon } from "lucide-react";

export function Nav() {
  return (
    <header>
        <div className="flex justify-between">
          <div className="flex flex-horizon font-bold gap-1">
            <ListTodoIcon />
            <p>QuesTODO</p>
          </div>
          <ThemeChanger />
        </div>
    </header>
  )
}