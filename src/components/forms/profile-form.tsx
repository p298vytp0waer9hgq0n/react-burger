import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useForm } from "../../hooks/use-form";

import styles from "./forms.module.css";

export default function ProfileForm() {
  const { user, postUser } = useAuth();
  const { values, handleChange, setValues } = useForm({ name: user.userName, email: user.email, password: '' });
  const [activeInput, setActiveInput] = useState<string | null>(null);

  function submitProfile (evt: React.FormEvent) {
    evt.preventDefault();
    postUser({ username: values.name, email: values.email, password: values.password });
    setActiveInput(null);
  }

  function resetForm () {
    setValues({
      name: user.userName,
      email: user.email,
      password: ''
    });
    setActiveInput(null);
  }

  return (
    <form className={`ml-15 ${styles.profileForm}`} onSubmit={submitProfile}>
      <Input
        disabled={activeInput !== 'name'}
        extraClass="mb-6"
        onIconClick={(evt) => setActiveInput(activeInput === 'name' ? null : 'name')}
        icon={activeInput === 'name' ? 'CloseIcon' : 'EditIcon'}
        name="name"
        placeholder="Имя"
        value={values.name}
        onChange={handleChange}
      />
      <Input
        disabled={activeInput !== 'email'}
        extraClass="mb-6"
        onIconClick={() => setActiveInput(activeInput === 'email' ? null : 'email')}
        icon={activeInput === 'email' ? 'CloseIcon' : 'EditIcon'}
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
      />
      <Input
        disabled={activeInput !== 'password'}
        extraClass="mb-6"
        onIconClick={() => setActiveInput(activeInput === 'password' ? null : 'password')}
        icon={activeInput === 'password' ? 'CloseIcon' : 'EditIcon'}
        name="password"
        type="password"
        placeholder="Пароль"
        value={values.password}
        onChange={handleChange}
      />
    { (values.name !== user.userName || values.email !== user.email || values.password) &&
      <>
        <Button onClick={() => resetForm()} type="secondary" htmlType="button">Отмена</Button>
        <Button htmlType="submit">Сохранить</Button>
      </>
    }
    </form>
  )
}
