import { useAppDispatch, useAppSelector } from "../components/app/hooks";
import { setEmail, setHasError, setIsLoading, setLogoff, setUserName } from "../services/user/user-slice";
import getUserDetails from "../utils/api/get-user-details";
import logout from "../utils/api/logout";
import updateUserInfo from "../utils/api/update-user-info";
import { getCookie } from "../utils/get-cookie";
import { setCookie } from "../utils/set-cookie";
import { TUser } from "../utils/types";
import useCheckToken from "./use-check-token";

export function useAuth () {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  const { checkToken } = useCheckToken();

  function getUser () {
    dispatch(setIsLoading(true));
    checkToken().then((res) => {
    if (res === false) {
      // user is not logged in
      dispatch(setIsLoading(false));
      dispatch(setHasError(false));
      return;
    }
    if (user.userName && res === user.accToken) {
      // user info up to date, no action necessary
      dispatch(setIsLoading(false));
      dispatch(setHasError(false));
      return;
    }
    getUserDetails(res).then((resp) => {
      dispatch(setUserName(resp.user.name));
      dispatch(setEmail(resp.user.email));
      dispatch(setIsLoading(false));
      dispatch(setHasError(false))
      return resp.success;
    }).catch((err) => {
      dispatch(setHasError(true));
      dispatch(setIsLoading(false));
      console.error('Ошибка загрузки профиля пользователя: ', err)
    });
  });
  }

  async function postUser({ username, email, password }: TUser) {
    dispatch(setIsLoading(true));
    checkToken().then((res) => {
    if (!res) throw new Error('Token check failed');
    updateUserInfo({ token: res, username, email, password }).then((resp) => {
      dispatch(setUserName(resp.user.name));
      dispatch(setEmail(resp.user.email));
      dispatch(setIsLoading(false));
      }).catch((err) => {
        dispatch(setHasError(true));
        dispatch(setIsLoading(false));
        console.error('Ошибка обновления профиля пользователя: ', err);
      });
    });
  }

  function logoutUser () {
    dispatch(setIsLoading(true));
    const token = getCookie('refToken');
    token && logout(token).then(() => {
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
