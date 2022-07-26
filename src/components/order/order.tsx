import { useMemo } from 'react';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order.module.css';

import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { useAppSelector } from '../app/hooks';

export default function Order () {
  const location = useLocation();
  const burger = useAppSelector((store) => store.burger);

  const total = useMemo<number>(() => {
    return (burger.bun?.price || 0) * 2 + burger.ingredients.reduce((cum: number, cur: TIngredient) => {
      return cum + cur.price;
    }, 0);
  }, [burger.bun, burger.ingredients]);

  return (
    <div className={`${styles.constructor__order} mt-10 mr-4 mb-10`}>
      <div className={`${styles.constructor__total} mr-10`}>
        <p className="text text_type_digits-medium">{total}&nbsp;</p>
        <div className={styles.constructor__bigicon}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
        <Link to={{pathname: "/order", state: { background: location }}}><Button type="primary" size="large" htmlType="button">Оформить заказ</Button></Link>
    </div>
  );
}
