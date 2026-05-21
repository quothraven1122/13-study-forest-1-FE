import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Modal2PC from './Modal2PC';
import Modal2Mobile from './Modal2Mobile';
import useResponsiveWidth from '../../hooks/useResponsiveWidth';
import styles from './Modal2.module.css';

export default function Modal2(props) {
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
        <Modal2Mobile {...props} />
      ) : (
        <Modal2PC {...props} />
      )}
    </div>,
    document.getElementById('modal-root')
  );
}
