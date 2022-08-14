import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import fetchIngredients from '../../utils/fetch-ingredients';

import app from './app.module.css';


export default function App () {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [ingredients, setIngredients] = useState<any>(null);
  const [test, setTest] = useState<any>(null); // test-burger

  useEffect(() => {
    fetchIngredients(
      'https://norma.nomoreparties.space/api/ingredients',
      setLoading,
      setError,
      setIngredients,
      setTest); // test-burger
  }, []);

  if (isLoading) {
    return (
    <p>Loading...</p>
  )}

  if (hasError) return (
    <p>Ошибка приложения</p>
  )

// test-burger
  return (
    <div className={app.page}>
      <AppHeader />
      <main className={`${app.main} pb-10`}>
        <BurgerIngredients data={ingredients} test={test} />
        <BurgerConstructor data={test} />
      </main>
    </div>
  );
}
