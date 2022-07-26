import { useEffect, useState } from 'react';
import { TFeedOrder } from '../../utils/types';
import { useAppSelector } from '../app/hooks';
import styles from './feed-stats.module.css';

export default function FeedStats () {
  const { total, totalToday, orders } = useAppSelector((store) => store.allOrders);
  const [pending, setPending] = useState<JSX.Element[]>([]);
  const [done, setDone] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const pending: JSX.Element[] = [];
    const done: JSX.Element[] = [];
    orders.forEach((elem: TFeedOrder) => {
      if (elem.status === 'pending') pending.push(<p key={elem.number} className="text text_type_digits-default">{elem.number}</p>);
      if (elem.status === 'done') done.push(<p key={elem.number} className="text text_type_digits-default">{elem.number}</p>);
    })
    setPending(pending);
    setDone(done);
  }, [orders]);

  return (
    <section className={styles.table}>
      <div className={styles.table__stats}>
        <div className={styles.table__column}>
          <p className="text text_type_main-medium">Готовы:</p>
          <div className={styles.table__numbers}>
            {done}
          </div>
        </div>
        <div className={styles.table__column}>
          <p className="text text_type_main-medium">В работе:</p>
          <div className={styles.table__numbers}>
            {pending}
          </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за всё время:</p>
        <p className={`${styles.table__number} text text_type_digits-large`}>{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className={`${styles.table__number} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section>
  )
}
