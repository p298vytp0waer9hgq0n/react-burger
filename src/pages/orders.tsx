import { useEffect, useRef } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useAppDispatch } from "../components/app/hooks";
import Orders from "../components/orders/orders";
import ProfileNav from "../components/profile-nav/profile-nav";
import { useAuth } from "../hooks/use-auth";
import { closeOrders, connectOrders } from "../services/orders/orders-slice";
import OrderInfoPage from "./order-info";

import styles from "./profile.module.css";

export default function OrdersPage () {
  const {user} = useAuth();
  const { path } = useRouteMatch();
  const dispatch = useAppDispatch();
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
    <Switch>
      <Route path={`${path}/:id`}>
        <OrderInfoPage />
      </Route>
      <Route path={path}>
        <main className={styles.main}>
          <div className={`${styles.profile} mt-10`}>
            <div className="mt-20">
              <ProfileNav />
              <p className={`${styles.profile__note} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете посмотреть&nbsp;свою историю заказов</p>
            </div>
            <Orders />
          </div>
        </main>
      </Route>
    </Switch>
  )
}
