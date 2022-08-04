import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./Ingredient";

import styles from './styles.module.css';

export default function BurgerIngredients (props) {
  const titleIngrStyle = `${styles.burger__comps} text text_type_main-medium mt-2 mb-6`;
  const [current, setCurrent] = React.useState('buns');
  const bunsElements = props.data.filter((item) => item.type === 'bun').map((bun) => {
    return <Ingredient key={bun._id} {...bun} />
  });
  const mainElements = props.data.filter((item) => item.type === 'main').map((main) => {
    return <Ingredient key={main._id} {...main} />
  });
  const sauceElements = props.data.filter((item) => item.type === 'sauce').map((sauce) => {
    return <Ingredient key={sauce._id} {...sauce} />
  });

  return (
    <section className={`${styles.burger}`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.burger__tabs}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="stuff" active={current === 'stuff'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={`${styles.burger__container} custom-scroll mt-8 pl-4 pr-1`}>
        <h2 className={titleIngrStyle}>Булки</h2>
        {bunsElements}
        <h2 className={titleIngrStyle}>Соусы</h2>
        {sauceElements}
        <h2 className={titleIngrStyle}>Начинки</h2>
        {mainElements}
      </div>
    </section>
  );
}
