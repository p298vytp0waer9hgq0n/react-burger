import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { statusText } from '../../utils/constants';
import convertDate from '../../utils/convert-date';
import FeedIconRow from '../feed-icon-row/feed-icon-row';
import styles from './feed-element.module.css';

import PropTypes from 'prop-types';
import { orderType } from '../../utils/types';

export default function FeedElement (props) {
  const ingList = useSelector((store) => store.ingredients.ingredients);
  const total = useMemo(() => {
    return props.ingredients.reduce((cum, cur) => cum + ingList.find((elem) => elem._id === cur).price, 0);
  });

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
          <CurrencyIcon />
        </div>
      </div>
    </article>
  )
}

FeedElement.propTypes = {
  ...orderType
}
