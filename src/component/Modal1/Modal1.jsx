import ic_trash from '../../asset/icon/ic_trash.svg';
import ic_plus from '../../asset/icon/ic_plus.svg';
import styles from './Modal1.module.css';
import { useState } from 'react';
export default function Modal1(onSave, onCancel) {
  // {
  //   habits,
  //   onChangeHabit,
  //   onAddHabit,
  //   onDeleteHabit,
  //   onCancel,
  //   onSave,
  // }
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: '오늘의 습관',
    },
    {
      id: 2,
      name: '오늘의 습관',
    },
    {
      id: 3,
      name: '오늘의 습관',
    },
    {
      id: 4,
      name: '오늘의 습관',
    },
    {
      id: 5,
      name: '오늘의 습관',
    },
    {
      id: 6,
      name: '오늘의 습관',
    },
  ]);

  const onChangeHabit = (id, value) => {
    const updateHabits = habits.map((habit) => {
      habit.id === id ? { ...habits, name: value } : habit;
    });
    setHabits(updateHabits);
  };

  const onDeleteHabit = (id) => {
    const filteredHabits = habits.filter((habit) => habit.id !== id);
    setHabits(filteredHabits);
  };

  const onAddHabit = () => {
    const newHabit = {
      id: Date.now(),
      name: '',
    };
    setHabits([...habits, newHabit]);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.title}>습관 목록</p>
        <div className={styles.habitListBox}>
          {habits.map((habit) => (
            <div className={styles.habitBox} key={habit.id}>
              <input
                type='text'
                className={styles.habit}
                value={habit.name}
                onChange={(e) => onChangeHabit(habit.id, e.target.value)}
              />

              <button
                className={styles.deleteBtn}
                onClick={() => onDeleteHabit(habit.id)}
              >
                <img src={ic_trash} alt='습관 삭제' />
              </button>
            </div>
          ))}
        </div>

        <button className={styles.addBtn} type='button' onClick={onAddHabit}>
          <img src={ic_plus} alt='습관 추가' />
        </button>

        <div>
          {/* 나중에 공용 버튼 컴포넌트로 변경 */}
          <button onClick={onCancel}>취소</button>
          <button onClick={onSave}>수정완료</button>
        </div>
      </div>
    </div>
  );
}
