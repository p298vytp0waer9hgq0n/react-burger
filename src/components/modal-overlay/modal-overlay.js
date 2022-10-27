import styles from './modal-overlay.module.css';

import PropTypes from 'prop-types';

export default function ModalOverlay (props) {
  const visStyle = `${styles.modal}`;

  return (
    <div onClick={props.clickHandler} className={visStyle}>
      {props && props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  clickHandler: PropTypes.func.isRequired
}.isRequired
