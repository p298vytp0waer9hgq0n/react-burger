import { Link, useLocation } from "react-router-dom";
import { TFeedOrder } from "../../utils/types";
import { useAppSelector } from "../app/hooks";
import FeedElement from "../feed-element/feed-element";

import styles from "./orders.module.css";

export default function Orders () {
  const location = useLocation();
  const { orders } = useAppSelector((store) => store.orders);
  const children = orders.map((order: TFeedOrder) => {
    return (
      <Link className={styles.orders__link} key={order._id} to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }}>
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
