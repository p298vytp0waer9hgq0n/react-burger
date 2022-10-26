import { NavLink } from 'react-router-dom';
import styles from './profile-nav.module.css';

export default function ProfileNav() {
  return (
    <div className={`${styles.profile__links}`}>
      <NavLink
        to="/profile"
        exact
        className={(active) => `${styles.profile__link} text text_type_main-medium ${ active ? 'text_color_primary' : 'text_color_inactive' }`}
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={(active) => `${styles.profile__link} text text_type_main-medium ${ active ? 'text_color_primary' : 'text_color_inactive' }`}
      >
        История заказов
      </NavLink>
      <NavLink
        to={{ pathname: "/profile/logout" }}
        className={(active) => `${styles.profile__link} text text_type_main-medium ${ active ? 'text_color_primary' : 'text_color_inactive' }`}
      >
        Выход
      </NavLink>
    </div>
  );
}
