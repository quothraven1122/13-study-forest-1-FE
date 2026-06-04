import { useRef } from 'react';
import styles from '../HomePage.module.css';
import StudyCard from './StudyCard.jsx';

function RecentStudiesSection({ recentStudies, saveRecentStudy }) {
  const isDragging = useRef(false);
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    isDragging.current = true;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className={styles.recentSection}>
      <p className={styles.title}>최근 조회한 스터디</p>
      <div className={styles.recentStudiesArea}>
        {recentStudies.length === 0 ? (
          <p className={styles.text}>아직 조회한 스터디가 없어요</p>
        ) : (
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={styles.recentStudyCardGrid}
          >
            {recentStudies.map((study) => (
              <StudyCard
                key={study.id}
                study={study}
                isDraggingRef={isDragging}
                onSaveRecent={saveRecentStudy}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentStudiesSection;