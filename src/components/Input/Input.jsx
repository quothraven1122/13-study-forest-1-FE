import styles from './Input.module.css';

export default function Input({
  placeholder = '소개 멘트 작성해주세요 ',
  value,
  onChange,
  maxLength = 300,
  textarea = false,
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      {textarea ? (
        <textarea
          className={styles.input}
          style={{ minHeight: '98px' }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />
      ) : (
        <input
          className={styles.input}
          style={{ height: '48px' }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          {...props}
        />
      )}
    </div>
  );
}
