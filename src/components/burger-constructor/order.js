import { useContext, useState } from 'react';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetail from '../order-details/order-details';

import placeOrder from '../../utils/place-order';
import { ConstructorContext, orderUrl } from '../../utils/constants';

export default function Order () {
  const [orderVisible, setOrderVisible] = useState(false);
  const {burger} = useContext(ConstructorContext);
  const [order, setOrder] = useState({});

  function handleOrderClick () {
    const ingredients = burger.map((item) => item._id);
    placeOrder(orderUrl, ingredients)
      .then((data) => {
        setOrder(data);
      });
    setOrderVisible(true);
  }

  function closeModal () {
    setOrderVisible(false);
  }

  const total = burger.reduce((cum, cur) => {
    return cur.type !== 'bun' ? cum + cur.price : cum + (cur.price * 2)
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
