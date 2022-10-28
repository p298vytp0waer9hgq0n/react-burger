import { useSelector } from "react-redux";
import FeedElement from "../feed-element/feed-element";

import styles from './feed.module.css';

export default function Feed () {
  const { orders } = useSelector((store) => store.allOrders);
  const children = orders.map((order) => <FeedElement key={order._id} {...order} />);
  return (
    <section className={styles.feed}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={ `${styles.feed__container} custom-scroll` }>
        {children}
      </div>
    </section>
  )
}
