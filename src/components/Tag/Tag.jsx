import styles from './Tag.module.css';
import pointIcon from '../../assets/icons/ic_point.svg';

function Tag({ point, status = 'light', children, className }) {
  const tagClass = status === 'dark' ? styles.tagDark : styles.tagLight;

  return (
    <>
      {point != null ? (
        <span className={`${styles.pointTag} ${tagClass}`}>
          <img src={pointIcon} alt='포인트' className={styles.icon} />
          {point}P 획득
        </span>
      ) : (
        <span className={`${styles.emojiTag} ${tagClass} ${className}`}>
          {children}
        </span>
      )}
    </>
  );
}

export default Tag;
