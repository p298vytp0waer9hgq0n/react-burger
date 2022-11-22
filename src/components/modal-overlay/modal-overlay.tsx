import styles from './modal-overlay.module.css';

import { TModalOverlayProps } from '../../utils/types';

export default function ModalOverlay (props: TModalOverlayProps) {
  const visStyle = `${styles.modal}`;

  return (
    <div onClick={props.clickHandler} className={visStyle}>
      {props && props.children}
    </div>
  );
}
