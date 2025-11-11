import Image from "next/image";
import Divider from "@/components/divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubSignButton } from "./oauth/github-oauth-button";
import { GoogleSignButton } from "./oauth/google-oauth-button";
import { KakaoSignButton } from "./oauth/kakao-oauth-button";
import { NaverSignButton } from "./oauth/naver-oauth-button";
import { credentialLogin } from "./sign.action";

export default function SignForm() {
  return (
    <>
      <div className="mb-10 place-items-center">
        <Image
          src="/app-icon.png"
          alt="main icon"
          width={48}
          height={48}
        ></Image>
        <h1 className="my-1 font-bold text-3xl text-stone-700">QuesTODO</h1>
        <h2 className="text-stone-500">Questify your TODOs.</h2>
      </div>
      <div className="text-center">
        <span className="text-gray-600">Sign with</span>
        <div className="mt-4 h-80 w-96 gap-6 space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <NaverSignButton />
            <KakaoSignButton />
            <GoogleSignButton />
            <GithubSignButton />
          </div>
          <Divider label="or" />
          <div className="place-items-center">
            <form
              action={credentialLogin}
              className="flex w-full flex-col items-center gap-3"
            >
              <Input type="email" name="email" placeholder="email..." />
              <Input
                type="password"
                name="password"
                placeholder="password..."
              />

              <div className="mt-2 flex w-full space-x-3">
                <Button type="submit" variant={"success"} className="flex-1">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
