import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useForm } from "../../hooks/use-form";
import { registerUser } from "../../services/user/user-slice";
import { useAppDispatch } from "../app/hooks";

import styles from './forms.module.css';

export default function RegisterForm () {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({ username: '', email: '', password: '' });

  function handleSubmit (evt: React.FormEvent) {
    evt.preventDefault();
    dispatch(registerUser({ username: values.username, email: values.email, password: values.password }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input placeholder="Имя" size="default" name="username" value={values.username} onChange={handleChange} />
      <Input placeholder="E-mail" size="default" name="email" value={values.email} onChange={handleChange} />
      <PasswordInput name="password" value={values.password} onChange={handleChange} />
      <Button htmlType="submit">Зарегистрироваться</Button>
    </form>
  )
}
