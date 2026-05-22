import { useState } from 'react';
import './HabitsPage.css';
import Chip from '../../components/Chip/Chip';

function HabitsPage() {
  // { habits = [] } => // 추후 props/API 데이터로 교체 예정
  const [habits /* setHabits*/] = useState([
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

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className='container'>
      <div className='header'>
        <div className='header-left'>
          <h1>연우의 개발공장</h1>
          <p>현재 시간</p>
          <span>{formattedDate}</span>
        </div>

        <div className='header-right'>
          <button>오늘의 집중 〉</button>
          <button>홈 〉</button>
        </div>
      </div>

      <div className='content'>
        <div className='content-header'>
          <h2>오늘의 습관</h2>
          <button onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? '완료' : '목록 수정'}
          </button>
        </div>

        <div className='habit-list'>
          {habits.map((habit) => (
            <Chip key={habit.id} text={habit.text} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabitsPage;
