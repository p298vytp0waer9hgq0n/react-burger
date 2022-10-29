import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { statusText } from "../../utils/constants";

import styles from "./order-info.module.css";

export default function OrderInfo ({ number, name, status, ingredients, createdAt }) {
  const ingList = useSelector((store) => store.ingredients.ingredients);
  const { elements, total } = useMemo(() => {
    const ingCounter = ingredients.reduce((counter, id) => {
      const curCount = counter[id] ?? 0;
      return { ...counter, [id]: curCount + 1 };
    }, {});
    const elements = [];
    let total = 0;
    for (const i in ingCounter) {
      const ing = ingList.find((ele) => ele._id === i);
      total += ingCounter[i] * ing.price;
      const element = (
        <div key={i} className={`${styles.ingredient} mr-5`}>
          <img src={ing.image_mobile} className={styles.icon} />
          <p>{ing.name}</p>
          <div className={`${styles.price} text_type_digits-default`}>
            <span>{ingCounter[i]}</span>
            <span>x</span>
            <span>{ingCounter[i] * ing.price}</span>
            <CurrencyIcon />
          </div>
        </div>
      );
      elements.push(element);
    }
    return { elements, total };
  }, [ingredients]);

  return (
    <section className={`${styles.container} text text_type_main-default`}>
      <p className={`${styles.number} text_type_digits-default`}>#{number}</p>
      <h1 className={`${styles.name} text_type_main-medium mt-10 mb-3`}>{name}</h1>
      <p className={status === 'done' ? styles.success : ''}>{statusText[status]}</p>
      <h2 className="mt-15">Состав:</h2>
      <div className={`${styles.list} custom-scroll`}>{elements}</div>
      <div className={`${styles.footer} mt-5`}>
        <p className="text_color_inactive">{createdAt}</p>
        <div className={`${styles.price} text_type_digits-default`}>
          <p>{total}</p>
          <CurrencyIcon />
        </div>
      </div>
    </section>
  )
}