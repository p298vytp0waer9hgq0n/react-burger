import { useDispatch } from "react-redux";
import { refreshToken } from "../services/user/user-slice";

export default function useRenewToken () {
  const dispatch = useDispatch();

  async function renewToken (token) {
    const data = await dispatch(refreshToken(token)).unwrap();
    return data.accessToken;
  }

  return {
    renewToken
  };
}
