import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "../../hooks/use-form";
import { reset } from "../../services/user/user-slice";
import { useAppDispatch } from "../app/hooks";

import styles from './forms.module.css';

export default function ResetPasswordForm () {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({ password: '', safeNumber: '' });
  const [success, setSuccess] = useState<boolean>(false);

  async function submitHandler (evt: React.FormEvent) {
    evt.preventDefault();
    const reply = await dispatch(reset({ password: values.password, token: values.safeNumber })).unwrap();
    setSuccess(reply.success);
  }

  if (success) return (
    <Redirect to="/login" />
  )

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <PasswordInput placeholder="Введите новый пароль" name="password" value={values.password} onChange={handleChange} />
      <Input placeholder="Введите код из письма" size="default" name="safeNumber" value={values.safeNumber} onChange={handleChange} />
      <Button htmlType="submit">Сохранить</Button>
    </form>
  )
}
