import { useSelector } from "react-redux";
import useRenewToken from "./use-renew-token";

export default function useCheckToken() {
  const user = useSelector((store) => store.user);
  const { renewToken } = useRenewToken();

  function checkToken() {
    if (user.accToken && user.expire > Date.now()) {
      return user.accToken;
    }
    let newToken = user.accToken;
    const token = document.cookie.match('refToken')?.input.split('=')[1] || null;
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
