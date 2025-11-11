import Image from "next/image";
import Divider from "@/components/divider";
import { GithubSignButton } from "./oauth/github-oauth-button";
import { GoogleSignButton } from "./oauth/google-oauth-button";
import { KakaoSignButton } from "./oauth/kakao-oauth-button";
import { NaverSignButton } from "./oauth/naver-oauth-button";

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
        <div className="mt-4 flex h-80 w-96 flex-col gap-6">
          <div className="grid grid-cols-2 gap-2">
            <NaverSignButton />
            <KakaoSignButton />
            <GoogleSignButton />
            <GithubSignButton />
          </div>
          <Divider label="or" />
          <div className="place-items-center">
            <div>credential login</div>
          </div>
        </div>
      </div>
    </>
  );
}
