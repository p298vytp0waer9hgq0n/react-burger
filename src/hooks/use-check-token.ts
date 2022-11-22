import { useAppSelector } from "../components/app/hooks";
import { getCookie } from "../utils/get-cookie";
import useRenewToken from "./use-renew-token";

export default function useCheckToken() {
  const user = useAppSelector((store) => store.user);
  const { renewToken } = useRenewToken();

  async function checkToken() {
    if (user.accToken && user.expire > Date.now()) {
      return user.accToken;
    }
    let newToken = user.accToken;
    const token = getCookie('refToken') || null;
    if (token) {
      await renewToken(token).then((resp) => newToken = resp);
    } else {
      return false;
    }
    return newToken;
  }

  return {
    checkToken
  }
}
