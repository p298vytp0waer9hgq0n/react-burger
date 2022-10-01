import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUserName } from "../services/user/user-slice";

import styles from './profile.module.css';

export default function ProfilePage () {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <div className={`${styles.profile__links}`}>
          <Link className={`${styles.profile__link} text text_type_main-medium text_color_primary`}>Профиль</Link>
          <Link className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}>История заказов</Link>
          <Link className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}>Выход</Link>
    <p className={`${styles.profile__note} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
        <form className="ml-15">
          <Input extraClass="mb-6" onIconClick={(evt) => console.log(evt)} icon="EditIcon" name="name" placeholder="Имя" value={user.userName} onChange={(evt) => dispatch(setUserName(evt.target.value))} />
          <Input extraClass="mb-6" />
          <Input />
        </form>
      </div>
    </main>
  )
}
