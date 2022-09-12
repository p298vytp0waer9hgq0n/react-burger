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

  const [{ opacity }, dragRef, dragPreview] = useDrag(() => ({
    type: dragTypes.sorting,
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1
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

  useEffect(() => {
    dragPreview(dropRef(ref));
  }, [dragPreview, dropRef]);

  return (
    <li className={styles.constructor__draggable} style={{opacity}} ref={ref}>
      <div className={styles.constructor__dragHandle} ref={dragRef}>
        <DragIcon />
      </div>
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={(evt) => dispatch(burgerRemove(item.uid))}
      />
    </li>
  )
}
