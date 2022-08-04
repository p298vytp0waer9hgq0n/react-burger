import React from 'react';

import './App.css';

import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

export default function App () {
  return (
    <>
      <h1>bleh</h1>
      <AppHeader />
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  );
}
