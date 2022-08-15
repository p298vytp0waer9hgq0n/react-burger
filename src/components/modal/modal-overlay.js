import { useState, useEffect } from "react";

import styles from './modals.module.css';

export default function ModalOverlay (props) {
  const [visible, setVisible] = useState(false);
  const visStyle = `${styles.modal} ${styles.modal_visible}`;
  const invisStyle = styles.modal;

  function handleClick (evt) {
    if (evt.target.classList.contains(styles.modal)) {
      setVisible(false);
      props.onClose();
    }
  }

  useEffect(() => {
    if (props.visible) setVisible(true);
  }, [props.visible]);

  return (
    <div onClick={handleClick} className={visible ? visStyle : invisStyle}>
      {props && props.children}
    </div>
  );
}
