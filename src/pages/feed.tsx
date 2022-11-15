import { useEffect, useRef } from "react";
import { useAppDispatch } from "../components/app/hooks";
import FeedStats from "../components/feed-stats/feed-stats";
import Feed from "../components/feed/feed";
import { closeAllOrders, connectAllOrders } from "../services/all-orders/all-orders-slice";

import styles from './home.module.css';

export default function FeedPage () {
  const dispatch = useAppDispatch();
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

  return (
    <main className={styles.main}>
      <Feed />
      <FeedStats />
    </main>
  )
}
