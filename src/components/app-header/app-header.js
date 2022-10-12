import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import styles from './app-header.module.css';

export default function AppHeader () {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.header__order}>
        <Link to="/" className={`${styles.header__button} pt-4 pb-4 pl-5 pr-5 ml-2 mr-2 mt-4 mb-4`}>
          <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
          <p className={`ml-2 text text_type_main-default ${location.pathname === '/' ? '' : 'text_color_inactive'}`}>Конструктор</p>
        </Link>
        <Link to="/" className={`${styles.header__button} pt-4 pb-4 pl-5 pr-5 mr-2 mt-4 mb-4`}>
          <ListIcon type={location.pathname === '/something' ? 'primary' : 'secondary'} />
          <p className={`ml-2 text text_type_main-default ${location.pathname === '/somethin' ? '' : 'text_color_inactive'}`}>Лента заказов</p>
        </Link>
      </nav>
      <Logo className={styles.header__logo} />
      <Link to="/profile" className={`${styles.header__button} pt-4 pb-4 pl-5 pr-5 mr-2 mt-4 mb-4`}>
        <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
        <p className={`ml-2 text text_type_main-default ${location.pathname === '/profile' ? '' : 'text_color_inactive'}`}>Личный кабинет</p>
      </Link>
    </header>
  )
}
