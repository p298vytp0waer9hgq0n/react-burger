import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerMove, burgerRemove } from "../../services/burger/burger-slice";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import styles from './burger-constructor-element.module.css';
import { useEffect, useRef } from "react";

export default function BurgerConstructorElement ({ item }) {
  const dispatch = useDispatch();
  const ref = useRef();

  const [{ opacity }, dragRef, dragPreview] = useDrag(() => ({
    type: 'ingredient/sort',
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1
    })
  }));
  const [, dropRef] = useDrop({
    accept: 'ingredient/sort',
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
