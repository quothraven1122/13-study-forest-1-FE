import styles from './Modal2.module.css';
import useResponsiveWidth from '../../hooks/useResponsiveWidth';

export default function Modal2PC({ title, message, children, onSubmit }) {
  const size = useResponsiveWidth();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type='button' className={styles.closeBtnPC}>
            나가기
          </button>
        </div>

        <p className={styles.message}>{message}</p>
        <div className={styles.children}>{children}</div>
      </div>

      {/*임시 버튼 - 나중에 컴포넌트로 대체*/}
      <button className={styles.btn}>수정하러 가기</button>
    </div>
  );
}
