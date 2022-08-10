import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';
import Order from "./Order";

export default function BurgerConstructor (props) {
  const burgerBun = props.test.find((item) => item.type === 'bun');
  const total = props.test.reduce((cum, ele) => cum + ele.price, 0);
  const burgerTop =
    <ConstructorElement
      type='top'
      isLocked={true}
      text={`${burgerBun.name} (верх)`}
      price={burgerBun.price}
      thumbnail={burgerBun.image}
      key='t'
    />;
  const burgerBottom =
    <ConstructorElement
      type='bottom'
      isLocked={true}
      text={`${burgerBun.name} (низ)`}
      price="0"
      thumbnail={burgerBun.image}
      key='b'
    />;
  const burgerElems = props.test.map((item, index) => {
    if (item.type !== 'bun') {
      return (
        <li className={styles.constructor__draggable}>
          <DragIcon />
          <ConstructorElement
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            key={index}
          />
        </li>
      )
    }
    return null;
  });
  return (
    <>
      <section className={`${styles.constructor} mt-25 pl-4`}>
        <div className={`${styles.constructor__term} pl-8 pr-4`}>{burgerTop}</div>
        <ul className={`${styles.constructor__list} pr-1 custom-scroll`}>
          {burgerElems}
        </ul>
        <div className={`${styles.constructor__term} pl-8 pr-4`}>{burgerBottom}</div>
        <Order total={total}/>
      </section>
    </>
  );
}
