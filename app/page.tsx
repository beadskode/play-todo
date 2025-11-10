import { use } from "react";
import { auth } from "@/lib/auth";

export default function Home() {
  const session = use(auth());
  const didSignin = !!session?.user;
  return (
    <div className="h-full">
      {didSignin ? <div>Redirect</div> : <div>Login First</div>}
    </div>
  );
}
