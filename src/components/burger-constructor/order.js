
import burgerConstructor from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from 'prop-types';
import OrderDetail from '../order-details/order-details';
import { useState } from 'react';
import Modal from '../modal/modal';

export default function Order (props) {
  const [orderVisible, setOrderVisible] = useState(false);

  function handleOrderClick () {
    setOrderVisible(true);
  }

  function closeModal () {
    setOrderVisible(false);
  }

  return (
    <div className={`${burgerConstructor.constructor__order} mt-10 mr-4 mb-10`}>
    <Modal title="" close={closeModal} visible={orderVisible}>
      <OrderDetail _id="034536" />
    </Modal>
      <div className={`${burgerConstructor.constructor__total} mr-10`}>
        <p className="text text_type_digits-medium">{props.total}&nbsp;</p>
        <div className={burgerConstructor.constructor__bigicon}>
          <CurrencyIcon />
        </div>
      </div>
        <Button type="primary" size="large" onClick={handleOrderClick}>Оформить заказ</Button>
    </div>
  );
}

Order.propTypes = {
  total: PropTypes.number.isRequired
}
