import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { requestReset } from "../../services/user/user-slice";

import styles from './forms.module.css';

export default function ForgotPasswordForm () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  async function submitHandler (evt) {
    evt.preventDefault();
    const reply = await dispatch(requestReset(email)).unwrap();
    setSuccess(reply.success);
  }

  if (success) return (
    <Redirect to="/reset-password" />
  )

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input placeholder="Укажите E-mail" size="default" name="email" type="email" value={email} onChange={(evt) => setEmail(evt.target.value) } />
      <Button htmlType="submit">Восстановить</Button>
    </form>
  )
}
