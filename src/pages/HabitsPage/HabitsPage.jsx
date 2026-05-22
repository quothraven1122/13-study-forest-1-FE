import { useState } from 'react';
import styles from './HabitsPage.module.css';
import Chip from '../../components/Chip/Chip';
import arrowRight from '../../assets/icons/ic_arrow_right.svg';

function HabitsPage() {
  // 추후 props/API 데이터로 교체 예정
  const [habits] = useState([
    {
      id: 1,
      text: '미라클 모닝 6시 기상',
    },
    {
      id: 2,
      text: '아침 챙겨 먹기',
    },
    {
      id: 3,
      text: 'React 공부 2시간',
    },
  ]);

  const now = new Date();

  const formattedDate = now.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={styles.HeaderLeft}>
          <h1>연우의 개발공장</h1>
          <p>현재 시간</p>
          <span>{formattedDate}</span>
        </div>

        <div className={styles.HeaderRight}>
          <button type='button' disabled>
            오늘의 집중
            <img src={arrowRight} alt='화살표 아이콘' />
          </button>

          <button type='button' disabled>
            홈
            <img src={arrowRight} alt='화살표 아이콘' />
          </button>
        </div>
      </div>

      <div className={styles.Content}>
        <div className={styles.ContentHeader}>
          <h2>오늘의 습관</h2>

          <button type='button' disabled>
            목록 수정
          </button>
        </div>

        <div className={styles.HabitList}>
          {habits.length === 0 ? (
            <div className={styles.EmptyMessage}>
              <p>아직 습관이 없어요</p>
              <span>목록 수정을 눌러 습관을 생성해보세요</span>
            </div>
          ) : (
            habits.map((habit) => <Chip key={habit.id} text={habit.text} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default HabitsPage;
