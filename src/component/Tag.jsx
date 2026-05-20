import styles from './Tag.module.css';
import pointIcon from '../asset/icon/ic_point.svg';

function Tag({ point = 0, memberCount = 0, status = 'light' }) {
  const tagClass = status === 'dark' ? styles.tagDark : styles.tagLight;

  return (
    <div className={styles.tagGroup}>
      <span className={`${styles.tag} ${tagClass}`}>
        <img src={pointIcon} alt='포인트' className={styles.icon} />
        {point}P 획득
      </span>
      <span className={`${styles.tag} ${tagClass}`}>
        <span className={styles.icon}>👩🏻‍💻</span>
        {memberCount}
      </span>
    </div>
  );
}

export default Tag;
