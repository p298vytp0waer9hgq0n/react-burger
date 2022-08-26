import { useEffect, useRef, useState, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import fetchIngredients from '../../utils/fetch-ingredients';

import { ConstructorContext, ingredientsUrl } from '../../utils/constants';

import app from './app.module.css';


export default function App () {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [ingredients, setIngredients] = useState<any>(null);
  const [burger, burgerDispatch] = useReducer(burgerReducer, []);

  const fetchRan = useRef(false); // чтобы фетч не гонял дважды в деве

  function burgerReducer (prev:any, action:any) {
    switch (action.type) {
      case 'add':
        if (action.value.type === 'bun' && prev.findIndex((item:any) => item.type === 'bun') !== -1) {
          return prev;
        }
        return [...prev, action.value];
      case 'remove':
        // не требуется
        break;
      case 'rearrange':
        // не требуется
        break;
      case 'clear':
        return [];
      default:
        return prev;
    }
  }

  useEffect(() => {
    if (fetchRan.current === false) {
      fetchIngredients(
        ingredientsUrl,
        setLoading,
        setError,
        setIngredients,
        burgerDispatch);
    }
    return () => { fetchRan.current = true };
  }, []);

  if (isLoading) {
    return (
    <p>Loading...</p>
  )}

  if (hasError) return (
    <p>Ошибка приложения</p>
  )

  return (
    <div className={app.page}>
      <AppHeader />
      <main className={`${app.main} pb-10`}>
        <ConstructorContext.Provider value={{burger, burgerDispatch}}>
        <BurgerIngredients data={ingredients} />
          <BurgerConstructor />
        </ConstructorContext.Provider>
      </main>
    </div>
  );
}
