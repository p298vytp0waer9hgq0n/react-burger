import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay";

import styles from "./modals.module.css";

import { modalRoot } from "../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal (props) {
  return createPortal((
    <ModalOverlay visible={props.visible} onClose={props.onClose}>
      <div className={`${styles.modal__container} p-10`}>
        <div className={styles.modal__header}>
          {props.title && <h2 className={`${styles.modal__title} text text_type_main-large mt-10 mb-5`}>
            Детали ингредиента
          </h2>}
          <button className={styles.modal__closeBtn} type="button" name="Close" onClick={props.onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {props && props.children}
      </div>
    </ModalOverlay>
  ), modalRoot);
}
