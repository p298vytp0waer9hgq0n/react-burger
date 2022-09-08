import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay";

import PropTypes from 'prop-types';

import styles from "./modals.module.css";

import { modalRoot } from "../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

export default function Modal (props) {

  function handleClick (evt) {
    if (evt.target.classList.contains(styles.modal)) {
      props.close();
    }
  }

  const isVisible = props.visible;
  const close = props.close;

  useEffect(() => {
    function closeOnEsc (evt) {
      evt.key === 'Escape' && close();
    }
    isVisible && document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [isVisible, close]);

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

Modal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}.isRequired
