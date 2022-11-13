import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";

import styles from "./forms.module.css";

export default function ProfileForm() {
  const { user, postUser } = useAuth();
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [newName, setNewName] = useState(user.userName);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');

  function submitProfile (evt: React.FormEvent) {
    evt.preventDefault();
    postUser({ username: newName, email: newEmail, password: newPassword });
    setActiveInput(null);
  }

  function resetForm () {
    setNewName(user.userName);
    setNewEmail(user.email);
    setNewPassword('');
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
        value={newName}
        onChange={(evt) => setNewName(evt.target.value)}
      />
      <Input
        disabled={activeInput !== 'email'}
        extraClass="mb-6"
        onIconClick={() => setActiveInput(activeInput === 'email' ? null : 'email')}
        icon={activeInput === 'email' ? 'CloseIcon' : 'EditIcon'}
        name="email"
        placeholder="Email"
        value={newEmail}
        onChange={(evt) => setNewEmail(evt.target.value)}
      />
      <Input
        disabled={activeInput !== 'password'}
        extraClass="mb-6"
        onIconClick={() => setActiveInput(activeInput === 'password' ? null : 'password')}
        icon={activeInput === 'password' ? 'CloseIcon' : 'EditIcon'}
        name="password"
        type="password"
        placeholder="Пароль"
        value={newPassword}
        onChange={(evt) => setNewPassword(evt.target.value)}
      />
    { (newName !== user.userName || newEmail !== user.email || newPassword) &&
      <>
        <Button onClick={() => resetForm()} type="secondary" htmlType="button">Отмена</Button>
        <Button htmlType="submit">Сохранить</Button>
      </>
    }
    </form>
  )
}
