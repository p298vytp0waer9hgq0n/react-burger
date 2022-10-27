import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/user/user-slice";

import styles from './forms.module.css';

export default function RegisterForm () {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit (evt) {
    evt.preventDefault();
    dispatch(registerUser({ username, email, password }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input placeholder="Имя" size="default" value={username} onChange={(evt) => setUsername(evt.target.value)} />
      <Input placeholder="E-mail" size="default" value={email} onChange={(evt) => setEmail(evt.target.value)} />
      <PasswordInput value={password} onChange={(evt) => setPassword(evt.target.value)} />
      <Button htmlType="submit">Зарегистрироваться</Button>
    </form>
  )
}
