import { useSelector } from "react-redux";
import FeedElement from "../feed-element/feed-element";

import styles from "./orders.module.css";

export default function Orders () {
  const { orders } = useSelector((store) => store.orders);
  const children = orders?.map((order) => <FeedElement key={order._id} auth {...order} />);
  return (
    <section className={styles.feed}>
      <div className={ `${styles.feed__container} custom-scroll` }>
        {children}
      </div>
    </section>
  )
}
