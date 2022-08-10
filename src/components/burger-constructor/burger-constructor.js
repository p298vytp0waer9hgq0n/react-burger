import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import './burger-constructor.css';
import Order from "./order";

import PropTypes from 'prop-types';

export default function BurgerConstructor (props) {
  const burgerBun = props.data.find((item) => item.type === 'bun');
  const total = props.data.reduce((cum, ele) => cum + ele.price, 0);
  const burgerTop =
    <ConstructorElement
      type='top'
      isLocked={true}
      text={`${burgerBun.name} (верх)`}
      price={burgerBun.price}
      thumbnail={burgerBun.image}
    />;
  const burgerBottom =
    <ConstructorElement
      type='bottom'
      isLocked={true}
      text={`${burgerBun.name} (низ)`}
      price="0"
      thumbnail={burgerBun.image}
    />;
  const burgerElems = props.data.map((item, index) => {
    if (item.type !== 'bun') {
      return (
        <li className="constructor__draggable">
          <DragIcon />
          <ConstructorElement
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            key={index} // !!поменять на что-то другое позже
          />
        </li>
      )
    }
    return null;
  });
  return (
    <>
      <section className="constructor mt-25 pl-4">
        <div className="constructor__term pl-8 pr-4">{burgerTop}</div>
        <ul className="constructor__list pr-1 custom-scroll">
          {burgerElems}
        </ul>
        <div className="constructor__term pl-8 pr-4">{burgerBottom}</div>
        <Order total={total} />
      </section>
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }))
}
