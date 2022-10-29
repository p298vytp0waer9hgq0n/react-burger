import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import OrderInfo from "../components/order-info/order-info";

import styles from "./ingredient.module.css";

export default function OrderInfoPage ({auth}) {
  const { orders } = useSelector((store) => auth ? store.orders : store.allOrders);
  const { id } = useParams();
  const order = orders.find((ele) => ele._id === id);
  return (
    <div className={styles.container}>
      <OrderInfo { ...order } />
    </div >
  )
}
