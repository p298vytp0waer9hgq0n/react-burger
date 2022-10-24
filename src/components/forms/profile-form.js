import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/use-auth";
import { setEmail, setUserName } from "../../services/user/user-slice";
import updateUserInfo from "../../utils/api/update-user-info";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [newName, setNewName] = useState(user.userName);
  const [newEmail, setNewEmail] = useState(user.email);

  function submitProfile (evt) {
    evt.preventDefault();
    updateUserInfo(user.accToken, newName, newEmail).then((resp) => {
      dispatch(setUserName(resp.user.name));
      dispatch(setEmail(resp.user.email));
    }).catch((err) => console.error('Ошибка обновления профиля пользователя: ', err));
  }

  return (
    <form className="ml-15" onSubmit={submitProfile}>
      <Input extraClass="mb-6" onIconClick={(evt) => console.log(evt)} icon="EditIcon" name="name" placeholder="Имя" value={newName} onChange={(evt) => setNewName(evt.target.value)} />
      <Input extraClass="mb-6" onIconClick={(evt) => console.log(evt)} icon="EditIcon" name="login" placeholder="Логин" value={newEmail} onChange={(evt) => setNewEmail(evt.target.value)} />
      <Input extraClass="mb-6" onIconClick={(evt) => console.log(evt)} icon="EditIcon" name="password" placeholder="Пароль" value={'something something'} onChange={(evt) => console.log(evt)} />
    </form>
  )
}
