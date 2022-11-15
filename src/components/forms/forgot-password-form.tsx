import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { requestReset } from "../../services/user/user-slice";
import { useAppDispatch } from "../app/hooks";

import styles from './forms.module.css';

export default function ForgotPasswordForm () {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  async function submitHandler (evt: React.FormEvent) {
    evt.preventDefault();
    const reply = await dispatch(requestReset(email)).unwrap();
    setSuccess(reply.success);
  }

  if (success) return (
    <Redirect to={{ pathname: '/reset-password', state: { tokenSent: true } }} />
  )

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input placeholder="Укажите E-mail" size="default" name="email" type="email" value={email} onChange={(evt) => setEmail(evt.target.value) } />
      <Button htmlType="submit">Восстановить</Button>
    </form>
  )
}
