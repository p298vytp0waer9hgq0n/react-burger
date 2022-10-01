import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { requestReset } from "../../services/user/user-slice";

import styles from './forms.module.css';

export default function ForgotPasswordForm () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  function submitHandler (evt) {
    evt.preventDefault();
    dispatch(requestReset(email));
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input placeholder="Укажите E-mail" size="default" name="email" type="email" value={email} onChange={(evt) => setEmail(evt.target.value) } />
      <Button htmlType="submit">Восстановить</Button>
    </form>
  )
}
