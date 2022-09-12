import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order.module.css';
import Modal from '../modal/modal';
import OrderDetail from '../order-details/order-details';

import { baseUrl, orderUrl } from '../../utils/constants';
import { orderBurger } from '../../features/burger/burgerSlice';

export default function Order () {
  const dispatch = useDispatch();
  const [orderVisible, setOrderVisible] = useState(false);
  const burger = useSelector((store) => store.burger);

  function handleOrderClick () {
    const ingredients = [...burger.ingredients, burger.bun].map((item) => item._id);
    dispatch(orderBurger({ url: baseUrl + orderUrl, data: ingredients}));
    setOrderVisible(true);
  }

  function closeModal () {
    setOrderVisible(false);
  }

  const total = (burger.bun.price || 0 * 2) + burger.ingredients.reduce((cum, cur) => {
    return cum + cur.price;
  }, 0);

  return (
    <div className={`${styles.constructor__order} mt-10 mr-4 mb-10`}>
    <Modal title="" close={closeModal} visible={orderVisible}>
      <OrderDetail />
    </Modal>
      <div className={`${styles.constructor__total} mr-10`}>
        <p className="text text_type_digits-medium">{total}&nbsp;</p>
        <div className={styles.constructor__bigicon}>
          <CurrencyIcon />
        </div>
      </div>
        <Button type="primary" size="large" onClick={handleOrderClick}>Оформить заказ</Button>
    </div>
  );
}
