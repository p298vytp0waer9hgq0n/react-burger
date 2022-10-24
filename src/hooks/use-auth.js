import { useDispatch, useSelector } from "react-redux";
import { setEmail, setIsLoading, setLogoff, setUserName } from "../services/user/user-slice";
import getUserDetails from "../utils/api/get-user-details";
import logout from "../utils/api/logout";
import useCheckToken from "./use-check-token";

export function useAuth () {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const { checkToken } = useCheckToken();

  async function getUser () {
    dispatch(setIsLoading(true));
    const token = await checkToken();
    if (typeof token !== 'string') {
      // either user is not logged in or access token is fine, no action necessary
      dispatch(setIsLoading(false));
      return;
    }
    getUserDetails(token).then((resp) => {
      dispatch(setUserName(resp.user.name));
      dispatch(setEmail(resp.user.email));
      dispatch(setIsLoading(false));
      return resp.success;
    }).catch((err) => {
      console.error('Ошибка загрузки профиля пользователя: ', err)
    });
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
