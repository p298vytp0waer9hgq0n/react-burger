import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from 'prop-types';

import styles from "./order-details.module.css";

export default function OrderDetail (props) {
  if (!props.success) {
    return (
      <div className={`${styles.thingy} mt-7 mb-8`}></div>
    );
  }
  return (
    <>
      <p className={`${styles.number} text text_type_digits-large mt-4`}>{props.order.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`${styles.thingy} mt-7 mb-8`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орибитальной станции</p>
    </>
  )
}

OrderDetail.propTypes = {
  success: PropTypes.bool,
  order: PropTypes.shape({
    number: PropTypes.number
  })
}
