import React, { useState, useRef, useMemo, useEffect } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { ingrTypes } from "../../utils/constants";

import styles from './burger-ingredients.module.css';
import { TCounter, TIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";


export default function BurgerIngredients () {
  const dispatch = useAppDispatch();
  const bunsRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const stuffRef = useRef<HTMLDivElement>(null);
  const burger = useAppSelector((store: any) => store.burger);


  function handleClick (tab: string) {
    setCurrent(tab);
    if (tab === ingrTypes.sauce) sauceRef.current!.scrollIntoView({behavior: 'smooth'});
    if (tab === ingrTypes.bun) bunsRef.current!.scrollIntoView({behavior: 'smooth'});
    if (tab === ingrTypes.main) stuffRef.current!.scrollIntoView({behavior: 'smooth'});
  }

  const ingredientCounters = useMemo(() => {
    const counters: TCounter = {};
    burger.ingredients.forEach((item: TIngredient) => {
      counters[item._id] = counters[item._id] + 1 || 1;
    });
    return counters;
  }, [burger.ingredients]);

  const [current, setCurrent] = useState(ingrTypes.bun);
  const titleIngrStyle = `${styles.burger__comps} text text_type_main-medium mt-2 mb-6`;
  const { ingredients } = useAppSelector((store: any) => store.ingredients);
  const elements = useMemo(() => {
    return ingredients.map((item: TIngredient) => {
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

  const bunsElements = elements.filter((elem: JSX.Element) => elem.props.type === ingrTypes.bun);
  const mainElements = elements.filter((elem: JSX.Element) => elem.props.type === ingrTypes.main);
  const sauceElements = elements.filter((elem: JSX.Element) => elem.props.type === ingrTypes.sauce);

  const sauceTrans = useRef<number>(0);
  const stuffTrans = useRef<number>(0);
  useEffect(() => {
    sauceTrans.current = (sauceRef.current!.offsetTop - bunsRef.current!.offsetTop) / 2;
    stuffTrans.current = (stuffRef.current!.offsetTop - bunsRef.current!.offsetTop + sauceRef.current!.offsetTop) / 2;
  }, [])

  function onScroll (evt: React.UIEvent<HTMLElement>) {
    if (evt.currentTarget.scrollTop < sauceTrans.current && current !== ingrTypes.bun) {
      setCurrent(ingrTypes.bun);
    }
    if (evt.currentTarget.scrollTop >= sauceTrans.current && evt.currentTarget.scrollTop < stuffTrans.current && current !== ingrTypes.sauce) {
      setCurrent(ingrTypes.sauce);
    }
    if (evt.currentTarget.scrollTop >= stuffTrans.current && current !== ingrTypes.main) {
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
