import { useSearchParams } from "next/navigation";
import { oAuthLogin, type Provider } from "../sign.action";

export function useLogin() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  return (provider: Provider) => {
    oAuthLogin(provider, redirectTo);
  };
}
