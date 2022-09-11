import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerMove, burgerRemove } from "../../features/burger/burgerSlice";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import styles from './burger-constructor.module.css';
import { useRef } from "react";

export default function Component ({ item }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ beingDragged }, dragRef, dragPreview] = useDrag({
    type: 'ingredient/sort',
    item: { ...item },
    collect: (monitor) => ({
      beingDragged: monitor.isDragging()
    })
  });
  const [, dropRef] = useDrop({
    accept: 'ingredient/sort',
    hover({ uid: draggedUid }) {
      dispatch(burgerMove({ uid: item.uid, draggedUid: draggedUid }));
    }
  });

  dropRef(dragPreview(ref));

  return (
    <li className={styles.constructor__draggable} style={{opacity: `${beingDragged ? 0 : 1}`}} ref={ref}>
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
