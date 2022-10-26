import { Link } from "react-router-dom";
import ProfileForm from "../components/forms/profile-form";

import styles from './profile.module.css';

export default function ProfilePage () {
  document.title = 'Profile';
  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <div className={`${styles.profile__links}`}>
          <Link to="/profile" className={`${styles.profile__link} text text_type_main-medium text_color_primary`}>Профиль</Link>
          <Link to="/profile/orders" className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}>История заказов</Link>
          <Link to={{pathname: "/profile/logout"}} className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}>Выход</Link>
          <p className={`${styles.profile__note} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
        <ProfileForm />
      </div>
    </main>
  )
}
