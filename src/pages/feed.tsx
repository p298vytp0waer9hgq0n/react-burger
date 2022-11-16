import { useEffect, useRef } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useAppDispatch } from "../components/app/hooks";
import FeedStats from "../components/feed-stats/feed-stats";
import Feed from "../components/feed/feed";
import { closeAllOrders, connectAllOrders } from "../services/all-orders/all-orders-slice";

import styles from './home.module.css';
import OrderInfoPage from "./order-info";

export default function FeedPage () {
  const dispatch = useAppDispatch();
  const { path } = useRouteMatch();
  const socketConnect = useRef(false);

  useEffect(() => {
    if (!socketConnect.current) dispatch(connectAllOrders());
    return () => {
      // StrictMode
      if (socketConnect.current) dispatch(closeAllOrders());
      socketConnect.current = true;
      // Deploy
      // dispatch(closeAllOrders());
    }
  }, [dispatch])

  if (!socketConnect) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <OrderInfoPage />
      </Route>
      <Route path={path}>
        <main className={styles.main}>
          <Feed />
          <FeedStats />
        </main>
      </Route>
    </Switch>
  )
}
