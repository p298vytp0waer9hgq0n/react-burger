import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { burgerMove, burgerRemove } from "../../services/burger/burger-slice";
import { dragTypes } from "../../utils/constants";
import styles from './burger-constructor-element.module.css';

export default function BurgerConstructorElement ({ item }) {
  const dispatch = useDispatch();
  const ref = useRef();

  function removeIngredient () {
    dispatch(burgerRemove(item.uid));
  }

  const [{ isVisible }, dragRef, dragPreview] = useDrag(() => ({
    type: dragTypes.sorting,
    item: { ...item },
    collect: (monitor) => ({
      isVisible: !monitor.isDragging()
    })
  }));
  const [, dropRef] = useDrop({
    accept: dragTypes.sorting,
    hover({ uid: draggedUid }) {
      if (item.uid !== draggedUid) {
        dispatch(burgerMove({ uid: item.uid, draggedUid: draggedUid }));
      }
    }
  });

  const elementStyle = `${styles.constructor__draggable} ${isVisible ? '' : styles.constructor__draggable_drag}`;

  useEffect(() => {
    dragPreview(dropRef(ref));
  }, [dragPreview, dropRef]);

  return (
    <li className={elementStyle} ref={ref}>
      <div className={styles.constructor__dragHandle} ref={dragRef}>
        <DragIcon />
      </div>
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={removeIngredient}
      />
    </li>
  )
}
