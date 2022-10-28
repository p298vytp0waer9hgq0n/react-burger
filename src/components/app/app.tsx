import { useEffect, useRef } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

export default function App() {
  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector((store: any) => store.ingredients);
  const location:any = useLocation();
  const history:any = useHistory();
  const background = location.state?.background;
  const tokenSent = location.state?.tokenSent;

  const fetchRan = useRef(false); // чтобы фетч не гонял дважды в деве

  function closeModal (evt:any) {
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
      <Switch location={ background || location }>
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
    </div>
  );
}
