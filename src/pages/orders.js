import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Orders from "../components/orders/orders";
import ProfileNav from "../components/profile-nav/profile-nav";
import { useAuth } from "../hooks/use-auth";
import { closeOrders, connectOrders } from "../services/orders/orders-slice";

import styles from "./profile.module.css";

export default function OrdersPage () {
  const {user} = useAuth();
  const dispatch = useDispatch();
  const socketConnect = useRef(false);

  useEffect(() => {
    if (!socketConnect.current) dispatch(connectOrders(user.accToken.split(' ')[1]));
    return () => {
      // StrictMode
      if (socketConnect.current) dispatch(closeOrders());
      socketConnect.current = true;
      // Deploy
      // dispatch(closeOrders());
    }
  }, [dispatch, user.accToken]);

  return (
    <main className={styles.main}>
      <div className={`${styles.profile} mt-10`}>
        <div className="mt-20">
          <ProfileNav />
          <p className={`${styles.profile__note} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете посмотреть&nbsp;свою историю заказов</p>
        </div>
        <Orders />
      </div>
    </main>
  )
}
