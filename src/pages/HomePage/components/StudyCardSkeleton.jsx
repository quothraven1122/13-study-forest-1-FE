import styles from '../HomePage.module.css'

function StudyCardSkeleton() {
  return (
    <div className={styles.loadingCard}>
      <div className={styles.loadingInfoBox}>
        <div className={styles.loadingTopBox}>
          <div className={styles.skeletonTitleLine}></div>
          <div className={styles.skeletonDaysLine}></div>
        </div>
        <div className={styles.skeletonDescriptionLine}></div>
      </div>
      <div className={styles.skeletonReactionBox}>
        <div className={styles.skeletonTag}></div>
        <div className={styles.skeletonTag}></div>
        <div className={styles.skeletonTag}></div>
      </div>
    </div>
  );
}

export default StudyCardSkeleton;
