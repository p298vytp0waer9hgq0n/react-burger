import styles from './modals.module.css';

import PropTypes from 'prop-types';

export default function ModalOverlay (props) {
  const visStyle = `${styles.modal} ${styles.modal_visible}`;
  const invisStyle = styles.modal;

  return (
    <div onClick={props.clickHandler} className={props.visible ? visStyle : invisStyle}>
      {props && props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  visible: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired
}.isRequired
