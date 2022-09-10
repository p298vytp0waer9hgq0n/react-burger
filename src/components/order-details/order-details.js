import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector } from "react-redux";

import styles from "./order-details.module.css";

export default function OrderDetail () {
  const order = useSelector((store) => store.burger.placedOrder);
  if (!order.success) {
    return (
      <>
        <p className="text text_type_main-medium mt-8">Something went wrong on server side</p>
        <div className={`${styles.thingy} mt-7 mb-8`}></div>
      </>
    );
  }
  return (
    <>
      <p className={`${styles.number} text text_type_digits-large mt-4`}>{order.order.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`${styles.thingy} mt-7 mb-8`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орибитальной станции</p>
    </>
  )
}
