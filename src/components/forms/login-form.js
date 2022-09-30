import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './forms.module.css';

export default function LoginForm () {
  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input placeholder="E-mail" size="default"/>
      <PasswordInput />
      <Button>Войти</Button>
    </form>
  )
}
