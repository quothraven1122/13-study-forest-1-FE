import styles from './Toast.module.css';
import { useEffect } from 'react';

// 아래 메세지 필요한 곳에 복사해서 쓰시면 됩니다.

/* <Toast message='50포인트를 획득했습니다!' type='success' /> */
/* <Toast message='집중이 중단되었습니다.' type='error' /> */

function Toast({
  id,
  message,
  type = 'success',
  duration = 3000,
  onClose,
  className,
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose?.(id);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, id, onClose]);

  const icon = type === 'success' ? '🎉' : '🚨';

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${className}`}
      role='status'
      aria-live='polite'
    >
      <span className={styles.icon}>{icon}</span>
      <span>{message}</span>
    </div>
  );
}

export default Toast;
