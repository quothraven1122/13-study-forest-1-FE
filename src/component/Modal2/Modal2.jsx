import styles from './Modal2.module.css';

export default function Modal2({ title, message, children, onSubmit }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.children}>{children}</div>
      </div>

      {/*임시 버튼 - 나중에 컴포넌트로 대체*/}
      <button className={styles.btn}>수정하러 가기</button>
    </div>
  );
}
