import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TFeedOrder } from "../../utils/types";
import FeedElement from "../feed-element/feed-element";

import styles from "./orders.module.css";

export default function Orders () {
  const { orders } = useSelector((store: any) => store.orders);
  const children = orders.map((order: TFeedOrder) => {
    return (
      <Link className={styles.orders__link} key={order._id} to={`/profile/orders/${order._id}`}>
        <FeedElement auth {...order} />
      </Link>
    )
  });
  return (
    <section className={styles.orders}>
      <div className={ `${styles.orders__container} custom-scroll` }>
        {children}
      </div>
    </section>
  )
}
