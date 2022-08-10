import { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./Ingredient";

import styles from './styles.module.css';

export default function BurgerIngredients (props) {
  useEffect(() => {
    const ele = document.getElementById(current);
    ele.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
  const [current, setCurrent] = useState('buns');
  const titleIngrStyle = `${styles.burger__comps} text text_type_main-medium mt-2 mb-6`;
  const elements = props.data.map((item) => {
    return <Ingredient key={item._id} {...item} quantity={props.test.reduce((count, cur) => {
      return (cur._id === item._id) ? count + 1 : count;
    }, 0)} />
  });
  const bunsElements = elements.filter((elem) => elem.props.type === 'bun');
  const mainElements = elements.filter((elem) => elem.props.type === 'main');
  const sauceElements = elements.filter((elem) => elem.props.type === 'sauce');

  return (
    <section className={`${styles.burger}`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.burger__tabs}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="stuff" active={current === 'stuff'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={`${styles.burger__container} custom-scroll mt-8`}>
        <h2 className={titleIngrStyle} id="buns">Булки</h2>
        {bunsElements}
        <h2 className={titleIngrStyle} id="sauces">Соусы</h2>
        {sauceElements}
        <h2 className={titleIngrStyle} id="stuff">Начинки</h2>
        {mainElements}
      </div>
    </section>
  );
}
