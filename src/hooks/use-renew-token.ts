import { useAppDispatch } from "../components/app/hooks";
import { refreshToken } from "../services/user/user-slice";

export default function useRenewToken () {
  const dispatch = useAppDispatch();

  async function renewToken (token: string) {
    const data = await dispatch(refreshToken(token)).unwrap();
    return data.accessToken;
  }

  return {
    renewToken
  };
}
