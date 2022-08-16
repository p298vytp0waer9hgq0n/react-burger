import { ingredientType } from "../../utils/types";
import Modal from "../modal/modal";

import PropTypes from 'prop-types';

import styles from "./ingredient-details.module.css";

export default function IngredientDetails (props) {
  if (!props.ingr) return null;
  return (
    <Modal
      title="Детали ингредиента"
      visible={props.visible}
      close={props.close}
    >
      <img src={props.ingr.image_large} alt={props.ingr.name} />
      <p className="text text_type_main-medium pt-4">{props.ingr.name}</p>
      <div className={`${styles.ingr__nutrcontainer} text_color_inactive mt-8 mb-6`}>
        <div className={styles.ingr__nutrition}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{props.ingr.calories}</p>
        </div>
        <div className={styles.ingr__nutrition}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{props.ingr.proteins}</p>
        </div>
        <div className={styles.ingr__nutrition}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{props.ingr.fat}</p>
        </div>
        <div className={styles.ingr__nutrition}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{props.ingr.carbohydrates}</p>
        </div>
      </div>
    </Modal>
  )
}

IngredientDetails.propTypes = {
  ingr: ingredientType,
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}
