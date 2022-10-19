import { useDispatch, useSelector } from "react-redux";
import { refreshToken, setEmail, setIsLoading, setLogoff, setUserName } from "../services/user/user-slice";
import getUserDetails from "../utils/api/get-user-details";
import logout from "../utils/api/logout";

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
    }).catch((err) => console.error('Ошибка загрузки профиля пользователя: ', err));
  }

  function logoutUser () {
    const token = document.cookie.match('refToken').input.split('=')[1];
    logout(token).then((resp) => {
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
