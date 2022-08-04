import { useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';
import {test} from '../../utils/data.js';
import Order from "./Order";

export default function BurgerConstructor () {
  const [current] = useState(test);
  const burgerBun = current.find((item) => item.type === 'bun');
  const total = current.reduce((cum, ele) => cum + ele.price, 0);
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
      price="0" //уточнить, считаем ли мы булку дважды или тока один раз
      thumbnail={burgerBun.image}
      key='b'
    />;
  const burgerElems = current.map((item, index) => {
    if (item.type !== 'bun') {
      return <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        key={index}
      />;
    }
  });
  return (
    <>
      <section className={`${styles.constructor} mt-20 pl-4 pr-4 custom-scroll`}>
        {burgerTop}
        {burgerElems}
        {burgerBottom}
        <Order total={total}/>
      </section>
    </>
  );
}
