import { useState, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredients";
import { ingredientType } from "../../utils/types";

import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";

export default function BurgerIngredients (props) {
  const bunsRef = useRef();
  const sauceRef = useRef();
  const stuffRef = useRef();
  const ingRef = useRef();
  const [ingVisible, setIngVisible] = useState(false);

  function handleClick (tab) {
    setCurrent(tab);
    if (tab === 'sauces') sauceRef.current.scrollIntoView({behavior: 'smooth'});
    if (tab === 'buns') bunsRef.current.scrollIntoView({behavior: 'smooth'});
    if (tab === 'stuff') stuffRef.current.scrollIntoView({behavior: 'smooth'});
  }

  function handleIngClick (ingDetails) {
    ingRef.current = ingDetails;
    setIngVisible(true);
  }

  function closeModal () {
    setIngVisible(false);
    console.log('bleh');
  }

  const [current, setCurrent] = useState('buns');
  const titleIngrStyle = `${styles.burger__comps} text text_type_main-medium mt-2 mb-6`;
  const elements = props.data.map((item) => {
    return (
      <Ingredient
        callback={handleIngClick}
        key={item._id}
        {...item}
        quantity={props.test.reduce((count, cur) => {
          return (cur._id === item._id) ? count + 1 : count;
        }, 0)}
      />
    );
  });
  const bunsElements = elements.filter((elem) => elem.props.type === 'bun');
  const mainElements = elements.filter((elem) => elem.props.type === 'main');
  const sauceElements = elements.filter((elem) => elem.props.type === 'sauce');

  return (
    <section className={styles.burger}>
      <IngredientDetails ingr={ingRef.current} visible={ingVisible} onClose={closeModal}></IngredientDetails>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.burger__tabs}>
        <Tab value="buns" active={current === 'buns'} onClick={handleClick}>Булки</Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={handleClick}>Соусы</Tab>
        <Tab value="stuff" active={current === 'stuff'} onClick={handleClick}>Начинки</Tab>
      </div>
      <div className={`${styles.burger__container} custom-scroll mt-8`}>
        <h2 className={titleIngrStyle} ref={bunsRef}>Булки</h2>
        <ul className={styles.burger__list}>{bunsElements}</ul>
        <h2 className={titleIngrStyle} ref={sauceRef}>Соусы</h2>
        <ul className={styles.burger__list}>{sauceElements}</ul>
        <h2 className={titleIngrStyle} ref={stuffRef}>Начинки</h2>
        <ul className={styles.burger__list}>{mainElements}</ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  // С помощью массива test сейчас наполняется бургер
  // в заказе, чтобы не хардкодить данные в верстку.
  // Это самое простое решение, которое я нашел,
  // чтобы все элементы были в достаточном количестве.
  test: PropTypes.arrayOf(ingredientType)
}
