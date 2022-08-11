import burgerConstructor from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from 'prop-types';

export default function Order (props) {
  return (
    <div className={`${burgerConstructor.constructor__order} mt-10 mr-4 mb-10`}>
      <div className={`${burgerConstructor.constructor__total} mr-10`}>
        <p className="text text_type_digits-medium">{props.total}&nbsp;</p>
        <div className={burgerConstructor.constructor__bigicon}>
          <CurrencyIcon />
        </div>
      </div>
        <Button type="primary" size="large">Оформить заказ</Button>
    </div>
  );
}

Order.propTypes = {
  total: PropTypes.number.isRequired
}
