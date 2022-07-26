import { useMemo } from "react";

import styles from "./feed-icon-row.module.css"

import { TIngredient, TIngredientsIds } from "../../utils/types";
import { useAppSelector } from "../app/hooks";

export default function FeedIconRow ({ingredients}: TIngredientsIds) {
  const ingrList = useAppSelector((store) => store.ingredients.ingredients);
  const add = ingredients.length - 6;
  const icons = useMemo<JSX.Element[]>(() => {
    const result = [];
    let bun;
    let first = true;
    for (let i = 0; i < Math.min(ingredients.length, 6); i++) {
      const current = ingrList.find((ele: TIngredient) => ele._id === ingredients[i]);
      if (!current) continue;
      if (current.type === 'bun') {
        bun = current;
        continue;
      }
      if (first && add > 0) {
        result.push(
          <div key={i} className={styles.lastContainer}>
            <img className={`${styles.icon} ${styles.icon_last}`} src={current.image_mobile} />
            <p className="text text_type_main-default">+{add}</p>
          </div>
        )
        first = false;
      } else {
      result.push(<img key={i} className={styles.icon} src={current.image_mobile} />)
      }
    }
    result.push(<img key={7} className={styles.icon} src={bun?.image_mobile} />)
    return result;
  }, [ingredients])

  return(
    <div className={styles.row}>
      {icons}
    </div>
  )
}
