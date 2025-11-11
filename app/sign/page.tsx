import Image from "next/image";
import Divider from "@/components/divider";
import { GithubSignButton } from "./oauth/github-oauth-button";
import { GoogleSignButton } from "./oauth/google-oauth-button";
import { KakaoSignButton } from "./oauth/kakao-oauth-button";
import { NaverSignButton } from "./oauth/naver-oauth-button";
import SignForm from "./sign-form";

export default function Sign() {
  return (
    <div className="h-full place-content-center place-items-center">
      <div className="mb-8 place-items-center">
        <Image
          src="/app-icon.png"
          alt="main icon"
          width={40}
          height={40}
        ></Image>
        <h1 className="mt-1 font-bold text-2xl text-stone-700">QuesTODO</h1>
        <h2 className="text-stone-500">Questify your TODOs.</h2>
      </div>
      <div className="w-96 gap-6 space-y-5">
        <div className="grid grid-cols-2 gap-2">
          <NaverSignButton />
          <KakaoSignButton />
          <GoogleSignButton />
          <GithubSignButton />
        </div>
        <Divider label="or" />
        <SignForm />
      </div>
    </div>
  );
}
