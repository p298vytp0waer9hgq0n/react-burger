import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { reset } from "../../services/user/user-slice";

import styles from './forms.module.css';

export default function ResetPasswordForm () {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [safeNumber, setSafeNumber] = useState('');
  const [success, setSuccess] = useState(false);

  async function submitHandler (evt: React.FormEvent) {
    evt.preventDefault();
    const reply = await dispatch(reset({ password: password, token: safeNumber })).unwrap();
    setSuccess(reply.success);
  }

  if (success) return (
    <Redirect to="/login" />
  )

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <PasswordInput placeholder="Введите новый пароль" value={password} onChange={(evt) => setPassword(evt.target.value)} />
      <Input placeholder="Введите код из письма" size="default" value={safeNumber} onChange={(evt) => setSafeNumber(evt.target.value)} />
      <Button htmlType="submit">Сохранить</Button>
    </form>
  )
}
