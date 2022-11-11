import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { burgerClear } from "../../services/burger/burger-slice";
import { orderBurger } from "../../services/order/order-slice";

import styles from "./order-details.module.css";

export default function OrderDetail () {
  const order = useSelector((store: any) => store.order);
  const burger = useSelector((store: any) => store.burger);
  const ingredients = [burger.bun, ...burger.ingredients, burger.bun].map((item) => item._id);
  const dispatch = useDispatch();
  const { accToken } = useSelector((store: any) => store.user);

  const orderPlaced = useRef(false);

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
      <p className={`${styles.number} text text_type_digits-large mt-4`}>{order.placedOrder.order?.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`${styles.thingy} mt-7 mb-8`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орибитальной станции</p>
    </>
  )
}
