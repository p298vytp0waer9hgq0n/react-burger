import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './forms.module.css';

export default function ForgotPasswordForm () {
  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input placeholder="Укажите E-mail" size="default"/>
      <Button>Восстановить</Button>
    </form>
  )
}
