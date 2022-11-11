import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../utils/types";

import styles from "./ingredient-details.module.css";

export default function IngredientDetails () {
  const ingredients = useSelector((store: any) => store.ingredients.ingredients);
  const { id } = useParams<{ id: string }>();
  const ingredient = ingredients.find((elem: TIngredient) => elem._id === id);

  if (!ingredient) return null;
  return (
    <>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium pt-4">{ingredient.name}</p>
      <div className={`${styles.ingr__nutrcontainer} text_color_inactive mt-8 mb-6`}>
        <div className={styles.ingr__nutrition}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div className={styles.ingr__nutrition}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div className={styles.ingr__nutrition}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div className={styles.ingr__nutrition}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </>
  )
}
