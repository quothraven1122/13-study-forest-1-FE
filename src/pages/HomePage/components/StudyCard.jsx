import { Link } from 'react-router-dom';
import Tag from '../../../components/Tag/Tag.jsx'; 
import styles from '../HomePage.module.css'; 

function StudyCard({ study, isDraggingRef, onSaveRecent }) {
  return (
    <Link
      draggable={false}
      onClick={(e) => {
        // 부모의 useRef 객체(.current)를 참조하여 드래그 중일 땐 이동 막기
        if (isDraggingRef?.current) {
          e.preventDefault();
          return;
        }
        // 최근 본 스터디 저장 함수 호출
        onSaveRecent?.(study);
      }}
      to={`/studies/${study.id}`}
      className={styles.studyCard}
      style={{ backgroundImage: `url(${study.background})` }}
    >
      <div className={styles.studyInfoBox}>
        <div className={styles.studyInfo}>
          <div className={styles.studyCardTopBox}>
            <div className={styles.studyTitleBox}>
              <p className={styles.studyTitle}>
                {study.nickname}의 {study.name}
              </p>
              <div className={styles.point}>
                {study.point === 0 ? (
                  <Tag type='small' point={'0'} status='dark' />
                ) : (
                  <Tag type='small' point={study.point} status='dark' />
                )}
              </div>
            </div>
            <p className={styles.daysCount}>{study.days}일째 진행 중</p>
          </div>

          <p className={styles.studyDescription}>{study.description}</p>
        </div>
        <div className={styles.reactionBox}>
          {Object.entries(study.reaction).map(([emoji, count]) => (
            <Tag type='small' key={emoji} status='dark'>
              {emoji} {count}
            </Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default StudyCard;