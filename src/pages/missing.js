import { Link } from 'react-router-dom';
import styles from './ingredient.module.css';

export default function MissingPage () {

  return (
    <div className={`${styles.container} mt-30`}>
      <h1 className="text text_type_digits-large mt-4">404</h1>
      <p className="text text_type_main-large mt-5 mb-10">Запрошенная вами страница не найдена</p>
        <span className="text text_type_main-default">
          Вернуться&nbsp;
          <Link to="/" className={styles.formContainer__link}>
            на главную
          </Link>
        </span>
    </div>
  )
}
