import styles from './Tag.module.css';

// point: 포인트 숫자, memberCount: 멤버 수
function Tag({ point = 0, memberCount = 0 }) {
  return (
    <div className={styles.tagGroup}>
      {/* 포인트 태그 */}
      <span className={styles.tag}>
        <span className={styles.icon}>🌿</span>
        {point}P 획득
      </span>

      {/* 멤버 수 태그 */}
      <span className={styles.tag}>
        <span className={styles.icon}>👤</span>
        {memberCount}
      </span>
    </div>
  );
}

export default Tag;
