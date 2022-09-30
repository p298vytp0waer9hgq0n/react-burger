import { Link } from "react-router-dom";
import ForgotPasswordForm from "../components/forms/forgot-password-form";

import styles from './form-page.module.css';

export default function ForgotPasswordPage () {
  return (
    <main className={styles.page}>
      <div className={styles.formContainer}>
        <ForgotPasswordForm />
        <span className="text text_type_main-default mt-20 mb-4">
          Вспомнили пароль?&nbsp;
          <Link to="/login" className={styles.formContainer__link}>
            Войти
          </Link>
        </span>
      </div>
    </main>
  )
}
