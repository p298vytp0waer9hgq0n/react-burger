import { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type {} from 'redux-thunk/extend-redux';

import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';

import styles from './app.module.css';
import { getIngredients } from '../../services/ingredients/ingredients-slice';
import LoginPage from '../../pages/login';


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
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}
