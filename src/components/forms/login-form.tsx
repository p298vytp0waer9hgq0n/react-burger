import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './forms.module.css';
import { loginUser } from "../../services/user/user-slice";
import { useLocation } from "react-router-dom";
import { TLocationState } from "../../utils/types";
import { useAppDispatch } from "../app/hooks";
import { useForm } from "../../hooks/use-form";

export default function LoginForm () {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({ email: '', password: '' });
  const location = useLocation<TLocationState>();

  function handleSubmit (evt: React.FormEvent) {
    evt.preventDefault();
    location.state = { redirect: location.state?.comeback }
    dispatch(loginUser({ email: values.email, password: values.password }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input type="email" placeholder="E-mail" size="default" name="email" value={values.email} onChange={handleChange} />
      <PasswordInput name="password" value={values.password} onChange={handleChange} />
      <Button htmlType="submit">Войти</Button>
    </form>
  )
}
