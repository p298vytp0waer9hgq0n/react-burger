import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { statusText } from '../../utils/constants';
import convertDate from '../../utils/convert-date';
import { TFeedElementProps, TIngredient } from '../../utils/types';
import { useAppSelector } from '../app/hooks';
import FeedIconRow from '../feed-icon-row/feed-icon-row';
import styles from './feed-element.module.css';

export default function FeedElement (props: TFeedElementProps) {
  const ingList = useAppSelector((store) => store.ingredients.ingredients);
  const total = useMemo<number>(() => {
    return props.ingredients.reduce((cum, cur) => {
      const ingrPrice = ingList.find((elem: TIngredient) => elem._id === cur)?.price
      return ingrPrice ? cum + ingrPrice : cum;
    }, 0);
  }, [props.ingredients]);

  return (
    <article className={`${styles.element} mb-4 mr-2`}>
      <div className={styles.element__info}>
        <span className="text text_type_digits-default">#{props.number}</span>
        <span className="text text_type_main-default text_color_inactive">{convertDate(props.createdAt)}</span>
      </div>
      <p className="text text_type_main-medium">{props.name}</p>
      {props.auth && <p className={`${props.status === 'done' ? styles.element__success : ''} text text_type_main-default`}>{statusText[props.status]}</p>}
      <div className={styles.element__info}>
        <FeedIconRow ingredients={props.ingredients} />
        <div className={styles.element__total}>
          <span className="text text_type_digits-default">{total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  )
}
