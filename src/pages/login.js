import LoginForm from "../components/forms/login-form";
import { Link, useLocation } from "react-router-dom";

import styles from './form-page.module.css';

export default function LoginPage () {
  return (
    <main className={styles.page}>
      <div className={styles.formContainer}>
        <LoginForm />
        <span className="text text_type_main-default mt-20 mb-4">
          Вы — новый пользователь?&nbsp;
          <Link to="/register" className={styles.formContainer__link}>
            Зарегистрироваться
          </Link>
        </span>
        <span className="text text_type_main-default">
          Забыли пароль?&nbsp;
          <Link to="/forgot-password" className={styles.formContainer__link}>
            Восстановить пароль
          </Link>
        </span>
      </div>
    </main>
  )
}
