import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FeedStats from "../components/feed-stats/feed-stats";
import Feed from "../components/feed/feed";
import { allOrdersConnect } from "../services/all-orders/all-orders-slice";

import styles from './home.module.css';

export default function FeedPage () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allOrdersConnect());
  }, [])
  return (
    <main className={styles.main}>
      <Feed />
      <FeedStats />
    </main>
  )
}
