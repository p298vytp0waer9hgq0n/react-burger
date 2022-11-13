import { useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./feed-icon-row.module.css"

import PropTypes from 'prop-types';
import { TIngredient, TIngredientsIds } from "../../utils/types";

export default function FeedIconRow ({ingredients}: TIngredientsIds) {
  const ingrList = useSelector((store: any) => store.ingredients.ingredients);
  const add = ingredients.length - 6;
  const icons = useMemo(() => {
    const result = [];
    let bun;
    let first = true;
    for (let i = 0; i < Math.min(ingredients.length, 6); i++) {
      const current = ingrList.find((ele: TIngredient) => ele._id === ingredients[i]);
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

FeedIconRow.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
}
