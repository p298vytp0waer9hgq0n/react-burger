import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { ingredientType } from '../../utils/types';
import styles from './ingredient.module.css';

export default function Ingredient ({callback, ...props}) {
  function handleClick () {
    callback();
  }

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...props },
  });

  return (
    <li
      className={`${styles.burger__ingredient} ml-4 mr-1 mb-8`}
      onClick={handleClick}
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

Ingredient.propTypes = ingredientType.isRequired;
