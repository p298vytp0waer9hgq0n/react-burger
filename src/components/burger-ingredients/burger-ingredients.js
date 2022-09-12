import { useState, useRef, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { setCurrentIngredient } from "../../services/ingredient-modal/ingredient-modal-slice";
import Ingredient from "../ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingTypes } from "../../utils/constants";

import styles from './burger-ingredients.module.css';


export default function BurgerIngredients () {
  const dispatch = useDispatch();
  const bunsRef = useRef();
  const sauceRef = useRef();
  const stuffRef = useRef();
  const [ingVisible, setIngVisible] = useState(false);
  const burger = useSelector((store) => store.burger);

  function handleClick (tab) {
    setCurrent(tab);
    if (tab === ingTypes.sauce) sauceRef.current.scrollIntoView({behavior: 'smooth'});
    if (tab === ingTypes.bun) bunsRef.current.scrollIntoView({behavior: 'smooth'});
    if (tab === ingTypes.main) stuffRef.current.scrollIntoView({behavior: 'smooth'});
  }

  function closeModal () {
    setTimeout(() => dispatch(setCurrentIngredient({})), 300);
    setIngVisible(false);
  }

  const [current, setCurrent] = useState(ingTypes.bun);
  const titleIngrStyle = `${styles.burger__comps} text text_type_main-medium mt-2 mb-6`;
  const { ingredients } = useSelector((store) => store.ingredients);
  const elements = useMemo(() => {
    return ingredients.map((item) => {
      return (
        <Ingredient
          callback={() => {
            dispatch(setCurrentIngredient(item));
            setIngVisible(true);
          }}
          key={item._id}
          {...item}
          quantity={
            item._id === burger.bun._id ? 2 : burger.ingredients.reduce((count, cur) => {
            return (cur._id === item._id) ? count + 1 : count;
          }, 0)}
        />
      );
    });
  }, [ingredients, burger, dispatch]);

  const bunsElements = elements.filter((elem) => elem.props.type === ingTypes.bun);
  const mainElements = elements.filter((elem) => elem.props.type === ingTypes.main);
  const sauceElements = elements.filter((elem) => elem.props.type === ingTypes.sauce);

  const sauceTrans = useRef(null);
  const stuffTrans = useRef(null);
  useEffect(() => {
    sauceTrans.current = (sauceRef.current.offsetTop - bunsRef.current.offsetTop) / 2;
    stuffTrans.current = (stuffRef.current.offsetTop - bunsRef.current.offsetTop + sauceRef.current.offsetTop) / 2;
  }, [])

  function onScroll (evt) {
    if (evt.target.scrollTop < sauceTrans.current && current !== ingTypes.bun) {
      setCurrent(ingTypes.bun);
    }
    if (evt.target.scrollTop >= sauceTrans.current && evt.target.scrollTop < stuffTrans.current && current !== ingTypes.sauce) {
      setCurrent(ingTypes.sauce);
    }
    if (evt.target.scrollTop >= stuffTrans.current && current !== ingTypes.main) {
      setCurrent(ingTypes.main);
    }
  }

  return (
    <section className={styles.burger}>
      <Modal
        title="Детали ингредиента"
        visible={ingVisible}
        close={closeModal}
      >
        <IngredientDetails></IngredientDetails>
      </Modal>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.burger__tabs}>
        <Tab value={ingTypes.bun} active={current === ingTypes.bun} onClick={handleClick}>Булки</Tab>
        <Tab value={ingTypes.sauce} active={current === ingTypes.sauce} onClick={handleClick}>Соусы</Tab>
        <Tab value={ingTypes.main} active={current === ingTypes.main} onClick={handleClick}>Начинки</Tab>
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
