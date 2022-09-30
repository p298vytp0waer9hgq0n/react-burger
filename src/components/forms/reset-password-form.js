import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './forms.module.css';

export default function ResetPasswordForm () {
  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <PasswordInput placeholder="Введите новый пароль" />
      <Input placeholder="Введите код из письма" size="default"/>
      <Button>Сохранить</Button>
    </form>
  )
}
