import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { ingredientType } from '../../utils/types';
import { dragTypes } from '../../utils/constants';

import styles from './ingredient.module.css';

import PropTypes from 'prop-types';

export default function Ingredient ({openIngredientDetails, ...props}) {

  const [, dragRef] = useDrag({
    type: dragTypes.ingredient,
    item: { ...props },
  });

  return (
    <li
      className={`${styles.burger__ingredient} ml-4 mr-1 mb-8`}
      onClick={openIngredientDetails}
      ref={dragRef}
    >
      {props.quantity > 0 && <Counter count={props.quantity} size="default" />}
      <img src={props.image} alt={props.name} />
      <div className={`${styles.burger__price} mt-2 mb-2`}>
        <p className="text text_type_digits-default">{props.price}&nbsp;</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.burger__name} text text_type_main-default`}>{props.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  openIngredientDetails: PropTypes.func.isRequired,
  ...ingredientType.isRequired
}
