import { useSelector } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './forms.module.css';

export default function LoginForm () {
  const user = useSelector((store) => store.user);

  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input placeholder="E-mail" size="default" value={user.email} onChange='' />
      <PasswordInput value="" onChange="" />
      <Button htmlType="submit">Войти</Button>
    </form>
  )
}
