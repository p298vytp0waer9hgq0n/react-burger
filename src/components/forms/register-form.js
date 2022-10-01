import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './forms.module.css';

export default function RegisterForm () {
  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input placeholder="Имя" size="default" value="" onChange="" />
      <Input placeholder="E-mail" size="default" value="" onChange="" />
      <PasswordInput value="" onChange="" />
      <Button htmlType="submit">Зарегистрироваться</Button>
    </form>
  )
}
