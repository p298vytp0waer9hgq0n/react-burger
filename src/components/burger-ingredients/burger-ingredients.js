import { useState, useRef, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { ingrTypes } from "../../utils/constants";

import styles from './burger-ingredients.module.css';


export default function BurgerIngredients () {
  const dispatch = useDispatch();
  const bunsRef = useRef();
  const sauceRef = useRef();
  const stuffRef = useRef();
  const burger = useSelector((store) => store.burger);


  function handleClick (tab) {
    setCurrent(tab);
    if (tab === ingrTypes.sauce) sauceRef.current.scrollIntoView({behavior: 'smooth'});
    if (tab === ingrTypes.bun) bunsRef.current.scrollIntoView({behavior: 'smooth'});
    if (tab === ingrTypes.main) stuffRef.current.scrollIntoView({behavior: 'smooth'});
  }

  const ingredientCounters = useMemo(() => {
    const counters = {};
    burger.ingredients.forEach((item) => {
      counters[item._id] = counters[item._id] + 1 || 1;
    });
    return counters;
  }, [burger.ingredients]);

  const [current, setCurrent] = useState(ingrTypes.bun);
  const titleIngrStyle = `${styles.burger__comps} text text_type_main-medium mt-2 mb-6`;
  const { ingredients } = useSelector((store) => store.ingredients);
  const elements = useMemo(() => {
    return ingredients.map((item) => {
      return (
        <Ingredient
          key={item._id}
          quantity={
            item._id === burger.bun._id ? 2 : ingredientCounters[item._id]
          }
          {...item}
        />
      );
    });
  }, [ingredients, burger, dispatch, ingredientCounters]);

  const bunsElements = elements.filter((elem) => elem.props.type === ingrTypes.bun);
  const mainElements = elements.filter((elem) => elem.props.type === ingrTypes.main);
  const sauceElements = elements.filter((elem) => elem.props.type === ingrTypes.sauce);

  const sauceTrans = useRef(null);
  const stuffTrans = useRef(null);
  useEffect(() => {
    sauceTrans.current = (sauceRef.current.offsetTop - bunsRef.current.offsetTop) / 2;
    stuffTrans.current = (stuffRef.current.offsetTop - bunsRef.current.offsetTop + sauceRef.current.offsetTop) / 2;
  }, [])

  function onScroll (evt) {
    if (evt.target.scrollTop < sauceTrans.current && current !== ingrTypes.bun) {
      setCurrent(ingrTypes.bun);
    }
    if (evt.target.scrollTop >= sauceTrans.current && evt.target.scrollTop < stuffTrans.current && current !== ingrTypes.sauce) {
      setCurrent(ingrTypes.sauce);
    }
    if (evt.target.scrollTop >= stuffTrans.current && current !== ingrTypes.main) {
      setCurrent(ingrTypes.main);
    }
  }

  return (
    <section className={styles.burger}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.burger__tabs}>
        <Tab value={ingrTypes.bun} active={current === ingrTypes.bun} onClick={handleClick}>Булки</Tab>
        <Tab value={ingrTypes.sauce} active={current === ingrTypes.sauce} onClick={handleClick}>Соусы</Tab>
        <Tab value={ingrTypes.main} active={current === ingrTypes.main} onClick={handleClick}>Начинки</Tab>
      </div>
      <div className={`${styles.burger__container} custom-scroll mt-8`} onScroll={onScroll}>
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
