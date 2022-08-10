import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

import { data, test } from './utils/data.js';

import './App.css';


export default function App () {
  return (
    <div className="page">
      <AppHeader />
      <main className="main pb-10">
        <BurgerIngredients data={data} test={test}/>
        <BurgerConstructor data={test}/>
      </main>
    </div>
  );
}
