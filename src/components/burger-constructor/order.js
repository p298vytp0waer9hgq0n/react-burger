import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetail from '../order-details/order-details';

import placeOrder from '../../utils/place-order';
import { baseUrl, orderUrl } from '../../utils/constants';

export default function Order () {
  const [orderVisible, setOrderVisible] = useState(false);
  const burger = useSelector((store) => store.burger);
  const [order, setOrder] = useState({});

  function handleOrderClick () {
    const ingredients = burger.map((item) => item._id);
    placeOrder(baseUrl + orderUrl, ingredients)
      .then((data) => {
        setOrder(data);
        setOrderVisible(true);
      })
      .catch((err) => {
        console.log(`Ошибка размещения заказа: ${err}`);
      });
  }

  function closeModal () {
    setOrderVisible(false);
  }

  const total = (burger.bun.price * 2) + burger.components.reduce((cum, cur) => {
    return cum + cur.price;
  }, 0);

  return (
    <div className={`${burgerConstructor.constructor__order} mt-10 mr-4 mb-10`}>
    <Modal title="" close={closeModal} visible={orderVisible}>
      <OrderDetail {...order} />
    </Modal>
      <div className={`${burgerConstructor.constructor__total} mr-10`}>
        <p className="text text_type_digits-medium">{total}&nbsp;</p>
        <div className={burgerConstructor.constructor__bigicon}>
          <CurrencyIcon />
        </div>
      </div>
        <Button type="primary" size="large" onClick={handleOrderClick}>Оформить заказ</Button>
    </div>
  );
}
