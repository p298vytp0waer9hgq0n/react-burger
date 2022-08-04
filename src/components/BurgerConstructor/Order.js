import styles from './styles.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Order (props) {
  return (
    <div className={styles.constructor__order}>
      <div>
        <p>{props.total}</p>
        <CurrencyIcon />
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  );
}
