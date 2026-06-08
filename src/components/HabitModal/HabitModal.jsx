import ic_trash from '../../assets/icons/ic_trash.png';
import ic_plus from '../../assets/icons/ic_plus.svg';
import styles from './HabitModal.module.css';
import { useEffect, useRef, useState } from 'react';

export default function HabitModal({ habits, onSave, onCancel }) {
  const [localHabits, setLocalHabits] = useState(habits.map((h) => ({ ...h })));

  const newHabitInputRef = useRef(null);
  const [focusHabitId, setFocusHabitId] = useState(null);

  useEffect(() => {
    if (focusHabitId && newHabitInputRef.current) {
      newHabitInputRef.current.focus();
    }
  }, [focusHabitId, localHabits]);

  // 수정
  const onChangeHabit = (targetId, value) => {
    setLocalHabits((prev) =>
      prev.map((habit) =>
        (habit.id || habit.tempId) === targetId
          ? { ...habit, name: value }
          : habit
      )
    );
  };

  // 삭제
  const onDeleteHabit = (targetId) => {
    setLocalHabits((prev) =>
      prev.filter((habit) => (habit.id || habit.tempId) !== targetId)
    );
  };

  // 추가
  const onAddHabit = () => {
    const tempId = crypto.randomUUID();

    setLocalHabits((prev) => [
      ...prev,
      {
        tempId,
        name: '',
        isDone: false,
      },
    ]);

    setFocusHabitId(tempId);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p className={styles.title}>습관 목록</p>

        <div className={styles.habitListBox}>
          {localHabits.map((habit) => (
            <div className={styles.habitBox} key={habit.id || habit.tempId}>
              <input
                ref={
                  focusHabitId === (habit.id || habit.tempId)
                    ? newHabitInputRef
                    : null
                }
                type='text'
                className={styles.habit}
                value={habit.name}
                onChange={(e) =>
                  onChangeHabit(habit.id || habit.tempId, e.target.value)
                }
              />

              <button
                className={styles.deleteBtn}
                onClick={() => onDeleteHabit(habit.id || habit.tempId)}
              >
                <img src={ic_trash} alt='습관 삭제' />
              </button>
            </div>
          ))}
        </div>

        <button className={styles.addBtn} type='button' onClick={onAddHabit}>
          <img src={ic_plus} alt='습관 추가' />
        </button>

        <div className={styles.btnBox}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            취소
          </button>

          <button
            className={styles.saveBtn}
            onClick={() => onSave(localHabits)}
          >
            수정완료
          </button>
        </div>
      </div>
    </div>
  );
}
