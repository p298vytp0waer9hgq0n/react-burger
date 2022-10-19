import { useDispatch, useSelector } from "react-redux";
import { refreshToken, setEmail, setIsLoading, setLogoff, setUserName } from "../services/user/user-slice";
import getUserDetails from "../utils/api/get-user-details";
import logout from "../utils/api/logout";

export function useAuth () {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  async function getUser () {
    if (user.accToken && user.expire > Date.now()) {
      return;
    }
    dispatch(setIsLoading(true));
    let newToken = user.accToken;
    if (!user.accToken || user.expire <= Date.now()) {
      try {
        const token = document.cookie.match('refToken').input.split('=')[1];
        const data = await dispatch(refreshToken(token)).unwrap();
        newToken = data.accessToken;
      } catch {
        dispatch(setIsLoading(false));
        return;
      }
    }
    getUserDetails(newToken).then((resp) => {
      dispatch(setUserName(resp.user.name));
      dispatch(setEmail(resp.user.email));
      dispatch(setIsLoading(false));
      return resp.success;
    }).catch((err) => console.error('Ошибка загрузки профиля пользователя: ', err));
  }

  function logoutUser () {
    const token = document.cookie.match('refToken').input.split('=')[1];
    logout(token).then(() => {
      dispatch(setLogoff);
      document.cookie = 'refToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/react-burger';
    }).catch((err) => console.error('Ошибка выхода из системы: ', err));
  }

  return {
    getUser,
    logoutUser,
    user
  };
}
