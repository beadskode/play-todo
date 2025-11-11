import { redirect } from "next/navigation";
import { use } from "react";
import { auth } from "@/lib/auth";

export default function Home() {
  const session = use(auth());
  const didSignin = !!session?.user;
  if (!didSignin) redirect("/sign");
  return <></>;
}
