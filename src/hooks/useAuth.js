import { useDispatch, useSelector } from "react-redux";
import { refreshToken, setEmail, setUserName } from "../services/user/user-slice";
import getUserDetails from "../utils/api/get-user-details";

export function useAuth () {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  async function getUser () {
    let newToken = user.accToken;
    if (!user.accToken || user.expire <= Date.now()) {
      const token = document.cookie.match('refToken').input.split('=')[1];
      if (!token) return;
      const data = await dispatch(refreshToken(token)).unwrap();
      newToken = data.accessToken;
    }
    getUserDetails(newToken).then((resp) => {
      dispatch(setUserName(resp.user.name));
      dispatch(setEmail(resp.user.email));
      return resp.success;
    }).catch((err) => console.error('user update error', err));
  }

  return {
    getUser
  };
}
