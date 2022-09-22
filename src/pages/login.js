import LoginForm from "../components/login-form/login-form";
import { Link } from "react-router-dom";

import styles from './login.module.css';

export default function LoginPage () {
  return (
    <main className={styles.login}>
      <div className={styles.login__container}>
        <LoginForm />
        <span className="text text_type_main-default mt-20 mb-4">
          Вы — новый пользователь?&nbsp;
          <Link to="/register" className={styles.login__link}>
            Зарегистрироваться
          </Link>
        </span>
        <span className="text text_type_main-default">
          Забыли пароль?&nbsp;
          <Link to="/forgot-password" className={styles.login__link}>
            Восстановить пароль
          </Link>
        </span>
      </div>
    </main>
  )
}
