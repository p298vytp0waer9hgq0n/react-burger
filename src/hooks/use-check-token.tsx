import { useSelector } from "react-redux";
import { getCookie } from "../utils/get-cookie";
import useRenewToken from "./use-renew-token";

export default function useCheckToken() {
  const user = useSelector((store: any) => store.user);
  const { renewToken } = useRenewToken();

  function checkToken() {
    if (user.accToken && user.expire > Date.now()) {
      return user.accToken;
    }
    let newToken = user.accToken;
    const token = getCookie('refToken') || null;
    if (token) {
      newToken = renewToken(token);
    } else {
      return;
    }
    return newToken;
  }

  return {
    checkToken
  }
}
