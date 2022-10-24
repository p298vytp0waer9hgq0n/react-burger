import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";

export default function ProfileForm() {
  const { user } = useAuth();
  const [activeInput, setActiveInput] = useState(null);
  const [newName, setNewName] = useState(user.userName);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');
  const { postUser } = useAuth();

  function submitProfile (evt) {
    evt.preventDefault();
    postUser(newName, newEmail, newPassword);
    setActiveInput(null);
  }

  return (
    <form className="ml-15" onSubmit={submitProfile}>
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
      <Button htmlType="submit">Сохранить</Button>
    </form>
  )
}
