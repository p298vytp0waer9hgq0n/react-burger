import { useAppSelector } from "../components/app/hooks";
import { getCookie } from "../utils/get-cookie";
import useRenewToken from "./use-renew-token";

export default function useCheckToken() {
  const user = useAppSelector((store) => store.user);
  const { renewToken } = useRenewToken();

  function checkToken() {
    if (user.accToken && user.expire > Date.now()) {
      return user.accToken;
    }
    let newToken = user.accToken;
    const token = getCookie('refToken') || null;
    if (token) {
      renewToken(token).then((resp) => newToken = resp);
    } else {
      return;
    }
    return newToken;
  }

  return {
    checkToken
  }
}
