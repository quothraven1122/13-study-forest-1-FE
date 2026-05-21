import ic_trash from '../../asset/icon/ic_trash.svg';
import ic_plus from '../../asset/icon/ic_plus.svg';
import styles from './Modal1.module.css';
import { useEffect, useState } from 'react';
export default function Modal1({ habits, onSave, onCancel }) {

  const [localHabits, setLocalHabits] = useState([]);

  useEffect(() => {
    setLocalHabits(structuredClone(habits));
  }, [habits]);

  // 수정
  const onChangeHabit = (id, value) => {
    setLocalHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: value } : h))
    );
  };

  // 삭제
  const onDeleteHabit = (id) => {
    setLocalHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // 추가
  const onAddHabit = () => {
    setLocalHabits((prev) => [...prev, { id: Date.now(), name: '' }]);
  };
  return (
    <div className={styles.modalBox}>
      <div className={styles.modal}>
        <p className={styles.title}>습관 목록</p>
        <div className={styles.habitListBox}>
          {localHabits.map((habit) => (
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
          <button onClick={() => onSave(localHabits)}>수정완료</button>
        </div>
      </div>
    </div>
  );
}
