import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import OrderInfo from "../components/order-info/order-info";
import { TFeedOrder } from "../utils/types";

import styles from "./ingredient.module.css";

export default function OrderInfoPage ({auth}: { auth: boolean; }) {
  const { orders } = useSelector((store: any) => auth ? store.orders : store.allOrders);
  const { id } = useParams<{ id: string; }>();
  const order = orders.find((ele: TFeedOrder) => ele._id === id);
  return (
    <div className={styles.container}>
      <OrderInfo { ...order } />
    </div >
  )
}
