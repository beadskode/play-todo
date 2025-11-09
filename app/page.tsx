import Image from "next/image";
import styles from "./page.module.css";
import { SignForm } from "./auth/sign-form";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className={cn(styles.page, 'h-full')}>
      <SignForm />
    </div>
  );
}
