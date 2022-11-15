import React, { useState } from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './forms.module.css';
import { loginUser } from "../../services/user/user-slice";
import { useLocation } from "react-router-dom";
import { TLocationState } from "../../utils/types";
import { useAppDispatch } from "../app/hooks";

export default function LoginForm () {
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSubmit (evt: React.FormEvent) {
    evt.preventDefault();
    location.state = { redirect: location.state?.comeback }
    dispatch(loginUser({ email, password }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input type="email" placeholder="E-mail" size="default" value={email} onChange={(evt) => setEmail(evt.target.value)} />
      <PasswordInput value={password} onChange={(evt) => setPassword(evt.target.value)} />
      <Button htmlType="submit">Войти</Button>
    </form>
  )
}
