import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order.module.css';

import { Link, useLocation } from 'react-router-dom';

export default function Order () {
  const location = useLocation();
  const burger = useSelector((store) => store.burger);

  const total = useMemo(() => {
    return (burger.bun.price || 0) * 2 + burger.ingredients.reduce((cum, cur) => {
      return cum + cur.price;
    }, 0);
  }, [burger.bun, burger.ingredients]);

  return (
    <div className={`${styles.constructor__order} mt-10 mr-4 mb-10`}>
      <div className={`${styles.constructor__total} mr-10`}>
        <p className="text text_type_digits-medium">{total}&nbsp;</p>
        <div className={styles.constructor__bigicon}>
          <CurrencyIcon />
        </div>
      </div>
        <Link to={{pathname: "/order", state: { background: location }}}><Button type="primary" size="large" htmlType="button">Оформить заказ</Button></Link>
    </div>
  );
}
