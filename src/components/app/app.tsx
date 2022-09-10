import { useEffect, useRef, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { ConstructorContext, baseUrl, ingredientsUrl } from '../../utils/constants';

import app from './app.module.css';
import generateTestBurger from '../../utils/test-burger';
import { getIngredients } from '../../features/ingredients/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import type {} from 'redux-thunk/extend-redux';


export default function App() {
  const dispatch = useDispatch();
  const { isLoading, ingredients, hasError } = useSelector((store: any) => store.ingredients);
  const [burger, burgerDispatch] = useReducer(burgerReducer, []);

  const fetchRan = useRef(false); // чтобы фетч не гонял дважды в деве

  function burgerReducer(prev: any, action: any) {
    switch (action.type) {
      case 'add':
        if (action.value.type === 'bun' && prev.findIndex((item: any) => item.type === 'bun') !== -1) {
          return prev;
        }
        return [...prev, action.value];
      case 'remove':
        // n/a
        break;
      case 'rearrange':
        // n/a
        break;
      case 'clear':
        return [];
      default:
        return prev;
    }
  }

  useEffect(() => {
    if (ingredients.length > 0) {
      const testBurger = generateTestBurger(ingredients);
      testBurger?.forEach((item) => burgerDispatch({ type: 'add', value: item }));
      }
  }, [ingredients]);

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
        <ConstructorContext.Provider value={{ burger, burgerDispatch }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </ConstructorContext.Provider>
      </main>
    </div>
  );
}
