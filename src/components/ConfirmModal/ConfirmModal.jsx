import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ConfirmModalPC from './ConfirmModalPC';
import ConfirmModalMobile from './ConfirmModalMobile';
import useResponsiveWidth from '../../hooks/useResponsiveWidth';
import styles from './Modal2.module.css';

export default function ConfirmModal(props) {
  const size = useResponsiveWidth();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });
  return createPortal(
    <div className={styles.modal}>
      {size === 'mobile' ? (
        <ConfirmModalMobile {...props} />
      ) : (
        <ConfirmModalPC {...props} />
      )}
    </div>,
    document.getElementById('modal-root')
  );
}
