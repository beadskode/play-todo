"use server";

import { signIn, signOut } from "@/lib/auth";

export type Provider = "google" | "github" | "naver" | "kakao";

export const oAuthLogin = async (
  provider: Provider,
  callback?: string | null,
) => {
  await signIn(provider, { redirectTo: callback || "/todo" });
};

export const credentialLogin = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    alert("Email and Password is required!");
    return;
  }

  const sign = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  console.log("🚀 sign:", sign); // error, ok, status, …
};

export const logout = async () => {
  await signOut({ redirectTo: "/sign" });
};
