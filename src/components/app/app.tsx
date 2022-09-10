import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {} from 'redux-thunk/extend-redux';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { baseUrl, ingredientsUrl } from '../../utils/constants';

import app from './app.module.css';
import generateTestBurger from '../../utils/test-burger';
import { getIngredients } from '../../features/ingredients/ingredientsSlice';
import { burgerAdd } from '../../features/burger/burgerSlice';


export default function App() {
  const dispatch = useDispatch();
  const { isLoading, ingredients, hasError } = useSelector((store: any) => store.ingredients);

  const fetchRan = useRef(false); // чтобы фетч не гонял дважды в деве

  useEffect(() => {
    if (ingredients.length > 0) {
      const testBurger = generateTestBurger(ingredients);
      testBurger?.forEach((item) => dispatch(burgerAdd(item)));
      }
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (fetchRan.current === false) {
      dispatch(getIngredients(baseUrl + ingredientsUrl));
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
    <div className={app.page}>
      <AppHeader />
      <main className={`${app.main} pb-10`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}
