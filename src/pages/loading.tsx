import styles from './ingredient.module.css';

export default function LoadingPage () {
  return(
    <div className={`${styles.container} mt-30`}>
      <h1 className="text text_type_main-large mt-4">Загрузка...</h1>
    </div>
  )
}
