import './burger-constructor.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Order (props) {
  return (
    <div className="constructor__order mt-10 mr-4 mb-10">
      <div className="constructor__total mr-10">
        <p className="text text_type_digits-medium">{props.total}&nbsp;</p>
        <div className="constructor__bigicon">
          <CurrencyIcon />
        </div>
      </div>
        <Button type="primary" size="large">Оформить заказ</Button>
    </div>
  );
}
