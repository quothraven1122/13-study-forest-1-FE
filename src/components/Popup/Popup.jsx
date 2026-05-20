import styles from './Popup.module.css';

function Popup({
  onConfirm,
  message = '정말 나가시겠습니까?',
  onCancel,
  showCancelButton = true,
  confirmText = '확인',
  cancelText = '취소',
}) {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p>{message}</p>

        <div className={styles.buttonGroup}>
          {showCancelButton && (
            <button
              type='button'
              className={styles.cancelButton}
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}

          <button
            type='button'
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
