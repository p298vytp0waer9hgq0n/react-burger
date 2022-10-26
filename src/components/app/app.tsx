import { useEffect, useRef } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
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
import Modal from '../modal/modal';
import IngredientPage from '../../pages/ingredient';
import OrdersPage from '../../pages/orders';
import MissingPage from '../../pages/missing';
import LoadingPage from '../../pages/loading';


export default function App() {
  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector((store: any) => store.ingredients);
  const location:any = useLocation();
  const background = location.state?.background;
  const tokenSent = location.state?.tokenSent;

  const fetchRan = useRef(false); // чтобы фетч не гонял дважды в деве

  useEffect(() => {
    if (fetchRan.current === false) {
      dispatch(getIngredients());
    }
    return () => { fetchRan.current = true };
  }, [dispatch]);

  if (isLoading) {
    return (
      <LoadingPage />
    )
  }

  if (hasError) return (
    <p>Ошибка приложения</p>
  )

  return (
    <div className={styles.page}>
      <AppHeader />
      <Switch location={ background || location }>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientPage />
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
        { tokenSent &&
        <Protected path="/reset-password" auth={false} redirect="/">
          <ResetPasswordPage />
        </Protected> }
        <Protected exact path="/profile" auth={true} redirect="/login" comeback>
          <ProfilePage />
        </Protected>
        <Protected path="/profile/logout" auth={true} redirect="/login">
          <LogoutPage />
        </Protected>
        <Protected path="/profile/orders" auth={true} redirect="/login" comeback>
          <OrdersPage />
        </Protected>
        <Route path="*">
          <MissingPage />
        </Route>
      </Switch>
      { background && <Route path="/ingredients/:id" children={<Modal />} /> }
      { background && <Protected auth={true} redirect="/login" path="/order" children={<Modal />} /> }
    </div>
  );
}
