import { useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./feed-icon-row.module.css"

export default function FeedIconRow ({ingredients}) {
  const ingrList = useSelector((store) => store.ingredients.ingredients);
  const lenght = ingredients.lenght;
  const icons = useMemo(() => {
    const ingrSliced = ingredients.slice(0, 5);
    return ingrSliced.map((id, index) => {
      return (
        <img key={index} className={styles.icon} src={ingrList.find((ele) => ele._id === id).image_mobile} />
      )
    });
  }, [ingredients]);
  /* const icons = useMemo(() => {
    const result = [];
    let i = 0;
    while (i < 6 || i < ingredients.length) {
      const current = ingrList.find((ele) => ele._id === ingredients[i]);

    }
  }) */

  return(
    <div className={styles.row}>
      {icons.reverse()}
    </div>
  )
}
