import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";
import overlayStyles from "../modal-overlay/modal-overlay.module.css";

import { modalRoot } from "../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { TModalProps } from "../../utils/types";

export default function Modal ({ children, title, close }: TModalProps) {

  function handleClick (evt: React.MouseEvent) {
    if ((evt.target as Element).classList.contains(overlayStyles.modal)) {
      close(evt);
    }
  }

  useEffect(() => {
    function closeOnEsc (evt: KeyboardEvent) {
      evt.key === 'Escape' && close(evt);
    }
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [close]);

  return createPortal((
    <ModalOverlay clickHandler={handleClick}>
      <div className={`${styles.modal__container} p-10`}>
        <div className={styles.modal__header}>
          { title &&
            <h2 className={`${styles.modal__title} text text_type_main-large mt-10 mb-5`}>
              {title}
            </h2> }
          <button className={styles.modal__closeBtn} type="button" name="Close" onClick={(e) => close(e)}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>
  ), modalRoot!);
}
