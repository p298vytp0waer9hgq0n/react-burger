import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/register-form";

import styles from './form-page.module.css';

export default function RegisterPage () {
  return (
    <main className={styles.page}>
      <div className={styles.formContainer}>
        <RegisterForm />
        <span className="text text_type_main-default mt-20 mb-4">
          Уже зарегистрированы?&nbsp;
          <Link to="/login" className={styles.formContainer__link}>
            Войти
          </Link>
        </span>
      </div>
    </main>
  )
}
