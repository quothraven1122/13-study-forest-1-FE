import styles from './Tag.module.css';
import pointIcon from '../../assets/icons/ic_point.svg';

function Tag({ point = 0, status = 'light', type = 'general', children }) {
  const tagClass = status === 'dark' ? styles.tagDark : styles.tagLight;

  const sizeClass = type === 'small' ? styles.small : styles.general;

  return (
    <>
      {point !== 0 ? (
        <span className={`${styles.pointTag} ${tagClass} ${sizeClass}`}>
          <img src={pointIcon} alt='포인트' className={styles.icon} />
          {point}P 획득
        </span>
      ) : (
        <span className={`${styles.emojiTag} ${tagClass} ${sizeClass}`}>
          {children}
        </span>
      )}
    </>
  );
}

export default Tag;
