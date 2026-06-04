import styles from './ConfirmModal.module.css';

export default function ConfirmModalPC({
  title,
  message,
  btnText,
  children,
  onExit,
  onClick,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type='button' onClick={onExit} className={styles.closeBtnPC}>
            나가기
          </button>
        </div>

        <p className={styles.message}>{message}</p>
        <div className={styles.children}>{children}</div>
      </div>

      {/*임시 버튼 - 나중에 컴포넌트로 대체*/}
      <button className={styles.btn} onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
}
