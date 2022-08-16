import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay";

import styles from "./modals.module.css";

import { modalRoot } from "../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";

export default function Modal (props) {

  function handleClick (evt) {
    if (evt.target.classList.contains(styles.modal)) {
      props.close();
    }
  }

  const closeOnEsc = useCallback((evt) => {
      if (evt.key === 'Escape') {
        props.close();
      }
  }, [props]);

  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [closeOnEsc]);

  return createPortal((
    <ModalOverlay visible={props.visible} clickHandler={handleClick}>
      <div className={`${styles.modal__container} p-10`}>
        <div className={styles.modal__header}>
          {props.title && <h2 className={`${styles.modal__title} text text_type_main-large mt-10 mb-5`}>
            {props.title}
          </h2>}
          <button className={styles.modal__closeBtn} type="button" name="Close" onClick={props.close}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {props && props.children}
      </div>
    </ModalOverlay>
  ), modalRoot);
}
