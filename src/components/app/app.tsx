import React, { useEffect, useRef } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import type {} from 'redux-thunk/extend-redux';

import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import LogoutPage from '../../pages/logout';
import IngredientPage from '../../pages/ingredient';
import OrdersPage from '../../pages/orders';
import MissingPage from '../../pages/missing';
import LoadingPage from '../../pages/loading';

import { getIngredients } from '../../services/ingredients/ingredients-slice';
import ProtectedRoute from '../protected/protected-route';
import Modal from '../modal/modal';

import styles from './app.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetail from '../order-details/order-details';
import FeedPage from '../../pages/feed';
import OrderInfoPage from '../../pages/order-info';
import { TLocationState } from '../../utils/types';
import { useAppDispatch, useAppSelector } from './hooks';
import OrderInfo from '../order-info/order-info';

export default function App() {
  const dispatch = useAppDispatch();
  const { isLoading, hasError } = useAppSelector((store) => store.ingredients);
  const location = useLocation<TLocationState>();
  const history = useHistory<History>();
  const background = location.state?.background;
  const tokenSent = location.state?.tokenSent;

  const fetchRan = useRef<boolean>(false); // чтобы фетч не гонял дважды в деве

  function closeModal (evt: React.MouseEvent | React.KeyboardEvent) {
    evt.stopPropagation();
    history.goBack();
  }

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
      <Switch location={background ? background : location}>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
        <ProtectedRoute path="/login" auth={false} redirect="/">
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" auth={false} redirect="/">
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" auth={false} redirect="/">
          <ForgotPasswordPage />
        </ProtectedRoute>
        { tokenSent &&
          <ProtectedRoute path="/reset-password" auth={false} redirect="/">
            <ResetPasswordPage />
          </ProtectedRoute>
        }
        <ProtectedRoute exact path="/profile" auth={true} redirect="/login" comeback>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/logout" auth={true} redirect="/login">
          <LogoutPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" auth={true} redirect="/login" comeback>
          <OrdersPage />
        </ProtectedRoute>
        <Route path="/feed">
          <FeedPage />
        </Route>
        <Route path="*">
          <MissingPage />
        </Route>
      </Switch>
      {background &&
        <Route path="/ingredients/:id">
          <Modal title="Детали ингредиента" close={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      }
      {background &&
        <ProtectedRoute auth={true} redirect="/login" path="/order">
          <Modal title="" close={closeModal}>
            <OrderDetail />
          </Modal>
        </ProtectedRoute>
      }
      {background &&
        <Route path="/feed/:id">
          <Modal title="" close={closeModal}>
            <OrderInfo />
          </Modal>
        </Route>
      }
      {background &&
        <ProtectedRoute auth={true} redirect="/login" path="/profile/orders/:id">
          <Modal title="" close={closeModal}>
            <OrderInfo />
          </Modal>
        </ProtectedRoute>
      }
    </div>
  );
}

        /* <Route path="/feed/:id">
          <OrderInfoPage />
        </Route>
      {background &&
        <Route path="/feed/:id">
          <Modal title="" close={closeModal}>
            <OrderInfoPage />
          </Modal>
        </Route>
      }
        <ProtectedRoute path="/profile/orders/:id" auth={true} redirect="/login" comeback>
          <OrderInfoPage />
        </ProtectedRoute>
       */

