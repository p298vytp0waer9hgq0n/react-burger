import './app-header.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader () {
  return (
    <>
      <header className="header">
        <nav className="header__order">
          <button type="button" className="header__button pt-4 pb-4 pl-5 pr-5 ml-2 mr-2 mt-4 mb-4">
            <BurgerIcon type="primary" />
            <p className="ml-2 text text_type_main-default">Конструктор</p>
          </button>
          <button type="button" className="header__button pt-4 pb-4 pl-5 pr-5 mr-2 mt-4 mb-4">
            <ListIcon type="secondary" />
            <p className="ml-2 text text_type_main-default text_color_inactive">Лента заказов</p>
          </button>
        </nav>
        <Logo className="header__logo" />
        <button type="button" className="header__button pt-4 pb-4 pl-5 pr-5 mr-2 mt-4 mb-4">
          <ProfileIcon type="secondary" />
          <p className="ml-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
        </button>
      </header>
    </>
  )
}
