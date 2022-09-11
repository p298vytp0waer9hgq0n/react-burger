import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import Order from "./order";
import { useDrop } from "react-dnd";
import { burgerAdd, burgerRemove } from "../../features/burger/burgerSlice";

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
    return burger.components.map((item, index) => {
      if (item && item.type !== 'bun') {
        return (
          <li className={styles.constructor__draggable} key={index} draggable>
            <DragIcon />
            <ConstructorElement
              isLocked={false}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={(evt) => dispatch(burgerRemove(index))}
            />
          </li>
        )
      }
      return null;
    });
  },[burger.components, dispatch]);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop (item) {
      dropHandler(item);
    }
  });

  if (!burger.bun._id && burger.components.length < 1) {
    return (
      <section className={`${styles.constructor} mt-25 pl-4`} ref={dropTarget}>
        <p>dnd here</p>
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
