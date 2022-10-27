import { useDispatch, useSelector } from "react-redux";
import { setEmail, setHasError, setIsLoading, setLogoff, setUserName } from "../services/user/user-slice";
import getUserDetails from "../utils/api/get-user-details";
import logout from "../utils/api/logout";
import updateUserInfo from "../utils/api/update-user-info";
import { getCookie } from "../utils/get-cookie";
import { setCookie } from "../utils/set-cookie";
import useCheckToken from "./use-check-token";

export function useAuth () {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const { checkToken } = useCheckToken();

  async function getUser () {
    dispatch(setIsLoading(true));
    const token = await checkToken();
    if (typeof token !== 'string' || token === user.accToken) {
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
      dispatch(setHasError(true));
      dispatch(setIsLoading(false));
      console.error('Ошибка загрузки профиля пользователя: ', err)
    });
  }

  async function postUser(newName, newEmail, newPassword) {
    dispatch(setIsLoading(true));
    const token = await checkToken();
    updateUserInfo(token, newName, newEmail, newPassword).then((resp) => {
      dispatch(setUserName(resp.user.name));
      dispatch(setEmail(resp.user.email));
      dispatch(setIsLoading(false));
      }).catch((err) => {
        dispatch(setHasError(true));
        dispatch(setIsLoading(false));
        console.error('Ошибка обновления профиля пользователя: ', err);
      });
  }

  function logoutUser () {
    dispatch(setIsLoading(true));
    const token = getCookie('refToken');
    logout(token).then(() => {
      dispatch(setLogoff());
      setCookie('refToken', '', {expires: 'Thu, 01 Jan 1970 00:00:00 UTC'});
      dispatch(setIsLoading(false));
    }).catch((err) => console.error('Ошибка выхода из системы: ', err));
  }

  return {
    getUser,
    postUser,
    logoutUser,
    user
  };
}
