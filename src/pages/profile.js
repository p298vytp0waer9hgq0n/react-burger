import ProfileForm from "../components/forms/profile-form";
import ProfileNav from "../components/profile-nav/profile-nav";

import styles from './profile.module.css';

export default function ProfilePage () {
  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <div>
          <ProfileNav />
          <p className={`${styles.profile__note} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
        <ProfileForm />
      </div>
    </main>
  )
}
