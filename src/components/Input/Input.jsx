import styles from './Input.module.css';

export default function Input({ maxLength = 300, textarea = false, ...props }) {
  return (
    <div className={styles.wrapper}>
      {textarea ? (
        <textarea
          {...props}
          className={styles.input}
          style={{ minHeight: '98px' }}
          maxLength={maxLength}
        />
      ) : (
        <input
          {...props}
          className={styles.input}
          style={{ height: '48px' }}
          maxLength={maxLength}
        />
      )}
    </div>
  );
}
