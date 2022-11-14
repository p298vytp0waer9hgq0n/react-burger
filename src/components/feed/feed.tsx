import { Link } from "react-router-dom";
import { TFeedOrder } from "../../utils/types";
import { useAppSelector } from "../app/hooks";
import FeedElement from "../feed-element/feed-element";

import styles from './feed.module.css';

export default function Feed () {
  const { orders } = useAppSelector((store: any) => store.allOrders);
  const children = orders.map((order: TFeedOrder) => {
    return (
      <Link className={styles.feed__link} key={order._id} to={`/feed/${order._id}`}>
        <FeedElement  {...order} />
      </Link>
    )
  });
  return (
    <section className={styles.feed}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={ `${styles.feed__container} custom-scroll` }>
        {children}
      </div>
    </section>
  )
}
