"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useReducer } from "react";
import LabelInput from "@/components/label-input";
import { Button } from "@/components/ui/button";
import { credentialLogin } from "./sign.action";

type ToggleSigninProps = {
  toggleSign: () => void;
  email?: string | null;
};

export default function SignForm() {
  const [isSignin, toggleSign] = useReducer((pre) => !pre, true);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <>
      {isSignin ? (
        <SignIn toggleSign={toggleSign} email={email} />
      ) : (
        <SignUp toggleSign={toggleSign} />
      )}
    </>
  );
}

export function SignIn({ toggleSign }: ToggleSigninProps) {
  return (
    <>
      <form action={credentialLogin} className="flex flex-col space-y-2">
        <LabelInput
          label="email"
          type="email"
          name="email"
          // error={validError}
          placeholder="Email"
          // defaultValue={}
        />
        <LabelInput
          label="password"
          type="password"
          name="pw"
          // error={validError}
          placeholder="Password"
          // defaultValue={}
        />
        <LabelInput
          label="password confirm"
          type="password"
          name="password confirm"
          // error={validError}
          placeholder="Confirm your password"
          // defaultValue={}
        />
        <div className="mt-2 flex w-full space-x-3">
          <Button type="submit" variant={"success"} className="flex-1">
            Sign In
          </Button>
        </div>
      </form>
      <div className="mt-5 flex justify-between text-sm">
        <span>Don&apos;t have account?</span>
        <Link
          onClick={toggleSign}
          href="#"
          className="underline! text-stone-600!"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}

export function SignUp({ toggleSign }: ToggleSigninProps) {
  return (
    <>
      <form action={credentialLogin} className="flex flex-col space-y-2">
        <LabelInput
          label="email"
          type="email"
          name="email"
          // error={validError}
          placeholder="Email"
          // defaultValue={}
        />
        <LabelInput
          label="nickname"
          type="text"
          name="nickname"
          // error={validError}
          placeholder="Nickname"
          // defaultValue={}
        />
        <LabelInput
          label="password"
          type="password"
          name="pw"
          // error={validError}
          placeholder="Password"
          // defaultValue={}
        />
        <LabelInput
          label="password confirm"
          type="password"
          name="password confirm"
          // error={validError}
          placeholder="Confirm your password"
          // defaultValue={}
        />

        <div className="mt-2 flex w-full space-x-3">
          <Button type="submit" variant={"success"} className="flex-1">
            Sign Up
          </Button>
        </div>
      </form>
      <div className="mt-5 flex justify-between text-sm">
        <span>Already have account?</span>
        <Link
          onClick={toggleSign}
          href="#"
          className="underline! text-stone-600!"
        >
          Sign In
        </Link>
      </div>
    </>
  );
}
