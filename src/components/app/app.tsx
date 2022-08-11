import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { data } from '../../utils/data.js';
import { test } from '../../utils/test-burger';

import app from './app.module.css';


export default function App () {
  return (
    <div className={app.page}>
      <AppHeader />
      <main className={`${app.main} pb-10`}>
        <BurgerIngredients data={data} test={test}/>
        <BurgerConstructor data={test}/>
      </main>
    </div>
  );
}
