import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

import styles from './ingredient.module.css';

export default function IngredientPage() {
  return (
    <div className={`${styles.container} mt-30`}>
      <h2 className={`text text_type_main-large mt-10 mb-5`}>
        Детали ингредиента
      </h2>
      <IngredientDetails />
    </div>
  )
}
