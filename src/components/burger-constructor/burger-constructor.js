import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import uuid from 'react-uuid';

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { burgerAdd } from "../../services/burger/burger-slice";
import Order from "../order/order";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

import { dragTypes } from "../../utils/constants";

import styles from './burger-constructor.module.css';

export default function BurgerConstructor () {
  function dropHandler (item) {
    const uid = uuid();
    dispatch(burgerAdd({ uid, ...item }));
  }

  const dispatch = useDispatch();
  const burger = useSelector((store) => store.burger);

  const burgerBun = burger.bun;
  const burgerTop = burgerBun ?
    <ConstructorElement
      type='top'
      isLocked={true}
      text={`${burgerBun.name} (верх)`}
      price={burgerBun.price}
      thumbnail={burgerBun.image}
    /> : null;
  const burgerBottom = burgerBun ?
    <ConstructorElement
      type='bottom'
      isLocked={true}
      text={`${burgerBun.name} (низ)`}
      price={burgerBun.price} // по заданию вроде выходит, что мы берём за булку дважды, как жлобы
      thumbnail={burgerBun.image}
    /> : null;
  const burgerElems = useMemo(() => {
    return burger.ingredients.map((item) => {
        return (
          <BurgerConstructorElement key={item.uid} item={item} />
        )
    });
  },[burger.ingredients]);

  const [, dropTarget] = useDrop({
    accept: dragTypes.ingredient,
    drop (item) {
      dropHandler(item);
    }
  });

  if (!burger.bun._id && burger.ingredients.length < 1) {
    return (
      <section className={`${styles.constructor} ${styles.constructor_empty} mt-25 pl-4`} ref={dropTarget}>
        <p className="text text_type_main-large">Перетащите ингредиенты</p>
      </section>
    )
  }

  return (
    <section className={`${styles.constructor} mt-25 pl-4`} ref={dropTarget}>
      {burger.bun._id && <div className={`${styles.constructor__term} pl-8 pr-4`}>{burgerTop}</div>}
      <ul className={`${styles.constructor__list} pr-1 custom-scroll`}>
        {burgerElems}
      </ul>
      {burger.bun._id && <div className={`${styles.constructor__term} pl-8 pr-4`}>{burgerBottom}</div>}
      <Order />
    </section>
  );
}