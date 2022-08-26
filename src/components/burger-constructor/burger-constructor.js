import { useContext } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import Order from "./order";

import { ConstructorContext } from "../../utils/constants";

export default function BurgerConstructor () {
  const { burger } = useContext(ConstructorContext);

  const burgerBun = burger.find((item) => item.type === 'bun');
  const burgerTop = burgerBun ?
    <ConstructorElement
      type='top'
      isLocked={true}
      text={`${burgerBun.name} (верх)`}
      price={burgerBun.price}
      thumbnail={burgerBun.image}
    /> : null;
  const burgerBottom = burgerBun ?
    <ConstructorElement
      type='bottom'
      isLocked={true}
      text={`${burgerBun.name} (низ)`}
      price={burgerBun.price} // по заданию вроде выходит, что мы берём за булку дважды, как жлобы
      thumbnail={burgerBun.image}
    /> : null;
  const burgerElems = burger.map((item, index) => {
    if (item && item.type !== 'bun') {
      return (
        <li className={styles.constructor__draggable} key={index}>
          <DragIcon />
          <ConstructorElement
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        </li>
      )
    }
    return null;
  });

  return (
    <section className={`${styles.constructor} mt-25 pl-4`}>
      <div className={`${styles.constructor__term} pl-8 pr-4`}>{burgerTop}</div>
      <ul className={`${styles.constructor__list} pr-1 custom-scroll`}>
        {burgerElems}
      </ul>
      <div className={`${styles.constructor__term} pl-8 pr-4`}>{burgerBottom}</div>
      <Order />
    </section>
  );
}
