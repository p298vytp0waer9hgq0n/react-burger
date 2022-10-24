import { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type {} from 'redux-thunk/extend-redux';

import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';

import styles from './app.module.css';
import { getIngredients } from '../../services/ingredients/ingredients-slice';
import Protected from '../protected/protected';
import LogoutPage from '../../pages/logout';


export default function App() {
  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector((store: any) => store.ingredients);

  const fetchRan = useRef(false); // чтобы фетч не гонял дважды в деве

  useEffect(() => {
    if (fetchRan.current === false) {
      dispatch(getIngredients());
    }
    return () => { fetchRan.current = true };
  }, [dispatch]);

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if (hasError) return (
    <p>Ошибка приложения</p>
  )

  return (
    <div className={styles.page}>
      <AppHeader />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Protected path="/login" auth={false} redirect="/">
          <LoginPage />
        </Protected>
        <Protected path="/register" auth={false} redirect="/">
          <RegisterPage />
        </Protected>
        <Protected path="/forgot-password" auth={false} redirect="/">
          <ForgotPasswordPage />
        </Protected>
        <Protected path="/reset-password" auth={false} redirect="/">
          <ResetPasswordPage />
        </Protected>
        <Protected exact path="/profile" auth={true} redirect="/login">
          <ProfilePage />
        </Protected>
        <Protected path="/profile/logout" auth={true} redirect="/login">
          <LogoutPage />
        </Protected>
      </Switch>
    </div>
  );
}
