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
  try {
    await signIn("credentials", formData);
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/sign" });
};
