import React from 'react';

import './App.css';

import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import { data, test } from './utils/data.js';

export default function App () {
  return (
    <div className="page">
      <AppHeader />
      <main className="main pb-10">
        <BurgerIngredients data={data} test={test}/>
        <BurgerConstructor test={test}/>
      </main>
    </div>
  );
}
