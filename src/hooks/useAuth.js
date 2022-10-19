import { useDispatch, useSelector } from "react-redux";
import { refreshToken, setEmail, setIsLoading, setUserName } from "../services/user/user-slice";
import getUserDetails from "../utils/api/get-user-details";

export function useAuth () {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  async function getUser () {
    if (user.accToken && user.expire > Date.now()) {
      console.log('reuse auth');
      return;
    }
    dispatch(setIsLoading(true));
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
      dispatch(setIsLoading(false));
      return resp.success;
    }).catch((err) => console.error('user update error', err));
  }

  return {
    getUser,
    user
  };
}
