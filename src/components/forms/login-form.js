import { useState } from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './forms.module.css';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/user/user-slice";
import { Redirect } from "react-router-dom";

export default function LoginForm () {
  const dispatch = useDispatch();
  const { userName } = useSelector((store) => store.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit (evt) {
    evt.preventDefault();
    dispatch(loginUser({ email, password }))
  }

  if (userName !== '') {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
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
