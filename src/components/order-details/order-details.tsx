import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef } from "react";

import { burgerClear } from "../../services/burger/burger-slice";
import { orderBurger } from "../../services/order/order-slice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import styles from "./order-details.module.css";

export default function OrderDetail () {
  const orderPlaced = useRef(false);
  const dispatch = useAppDispatch();
  const order = useAppSelector((store) => store.order);
  const burger = useAppSelector((store) => store.burger);
  const { accToken } = useAppSelector((store) => store.user);
  const ingredients = burger.ingredients.length > 0 ? burger.ingredients.map((item) => item._id) : [];
  if (burger.bun) {
    ingredients.push(burger.bun._id);
    ingredients.unshift(burger.bun._id);
  }

  useEffect(() => {
      if (!orderPlaced.current) dispatch(orderBurger({ ingredients, accToken })).then(() => dispatch(burgerClear(true)));
  }, [])

  if (order.isLoading) {
    return (
      <>
        <p className="text text_type_main-medium mt-8">Processing...</p>
        <div className={`${styles.thingy} mt-7 mb-8`}></div>
      </>
    )
  }

  if (order.hasError) {
    return (
      <>
        <p className="text text_type_main-medium mt-8">Something went wrong</p>
        <div className={`${styles.thingy} mt-7 mb-8`}></div>
      </>
    );
  }

  return (
    <>
      <p className={`${styles.number} text text_type_digits-large mt-4`}>{order.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`${styles.thingy} mt-7 mb-8`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орибитальной станции</p>
    </>
  )
}
