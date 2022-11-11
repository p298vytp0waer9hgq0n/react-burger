import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';

import { TCountedIngredient } from '../../utils/types';
import { dragTypes } from '../../utils/constants';

import styles from './ingredient.module.css';

export default function Ingredient (props: TCountedIngredient) {
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: dragTypes.ingredient,
    item: { ...props },
  });

  return (
    <Link
      className={`${styles.burger__ingredient} ml-4 mr-1 mb-8`}
      ref={dragRef}
      to={{pathname: `/ingredients/${props._id}`, state: { background: location }}}
    >
      {props.quantity > 0 && <Counter count={props.quantity} size="default" />}
      <img src={props.image} alt={props.name} />
      <div className={`${styles.burger__price} mt-2 mb-2`}>
        <p className="text text_type_digits-default">{props.price}&nbsp;</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.burger__name} text text_type_main-default`}>{props.name}</p>
    </Link>
  )
}
