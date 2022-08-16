import styles from './modals.module.css';

export default function ModalOverlay (props) {
  const visStyle = `${styles.modal} ${styles.modal_visible}`;
  const invisStyle = styles.modal;

  return (
    <div onClick={props.clickHandler} className={props.visible ? visStyle : invisStyle}>
      {props && props.children}
    </div>
  );
}
