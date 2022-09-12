import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import Order from "../order/order";
import { useDrop } from "react-dnd";
import { burgerAdd } from "../../services/burger/burger-slice";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

export default function BurgerConstructor () {
  function dropHandler (item) {
    dispatch(burgerAdd(item));
  }

  const dispatch = useDispatch();
  const burger = useSelector((store) => store.burger);

  const burgerBun = burger.bun;
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
  const burgerElems = useMemo(() => {
    return burger.ingredients.map((item) => {
        return (
          <BurgerConstructorElement key={item.uid} item={item} />
        )
    });
  },[burger.ingredients]);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop (item) {
      dropHandler(item);
    }
  });

  if (!burger.bun._id && burger.ingredients.length < 1) {
    return (
      <section className={`${styles.constructor} ${styles.constructor_empty} mt-25 pl-4`} ref={dropTarget}>
        <p className="text text_type_main-large">Перетащите ингредиенты</p>
      </section>
    )
  }

  return (
    <section className={`${styles.constructor} mt-25 pl-4`} ref={dropTarget}>
      {burger.bun._id && <div className={`${styles.constructor__term} pl-8 pr-4`}>{burgerTop}</div>}
      <ul className={`${styles.constructor__list} pr-1 custom-scroll`}>
        {burgerElems}
      </ul>
      {burger.bun._id && <div className={`${styles.constructor__term} pl-8 pr-4`}>{burgerBottom}</div>}
      <Order />
    </section>
  );
}
