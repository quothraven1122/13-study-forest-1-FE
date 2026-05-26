import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './HabitsPage.module.css';
import Chip from '../../components/Chip/Chip';
import arrowRight from '../../assets/icons/ic_arrow_right.svg';

function HabitsPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();

  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem(`habits-${studyId}`);
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editHabits, setEditHabits] = useState([]);

  useEffect(() => {
    localStorage.setItem(`habits-${studyId}`, JSON.stringify(habits));
  }, [habits, studyId]);

  const handleToggleHabit = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, isDone: !habit.isDone } : habit
      )
    );
  };

  const handleOpenEditModal = () => {
    setEditHabits(habits);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddHabit = () => {
    const newHabit = {
      id: Date.now(),
      text: '',
      isDone: false,
    };

    setEditHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const handleChangeHabit = (id, value) => {
    setEditHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, text: value } : habit
      )
    );
  };

  const handleDeleteHabit = (id) => {
    setEditHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== id)
    );
  };

  const handleSaveHabits = () => {
    const filteredHabits = editHabits.filter(
      (habit) => habit.text.trim() !== ''
    );

    setHabits(filteredHabits);
    setIsEditModalOpen(false);
  };

  const handleGoFocus = () => {
    navigate(`/studies/${studyId}/focus`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

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
    <>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <div className={styles.HeaderLeft}>
            <h1>연우의 개발공장</h1>
            <p>현재 시간</p>
            <span>{formattedDate}</span>
          </div>

          <div className={styles.HeaderRight}>
            <button type='button' onClick={handleGoFocus}>
              오늘의 집중
              <img src={arrowRight} alt='화살표 아이콘' />
            </button>

            <button type='button' onClick={handleGoHome}>
              홈
              <img src={arrowRight} alt='화살표 아이콘' />
            </button>
          </div>
        </div>

        <div className={styles.Content}>
          <div className={styles.ContentHeader}>
            <h2>오늘의 습관</h2>

            <button type='button' onClick={handleOpenEditModal}>
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
              habits.map((habit) => (
                <Chip
                  key={habit.id}
                  text={habit.text}
                  isDone={habit.isDone}
                  onClick={() => handleToggleHabit(habit.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className={styles.ModalOverlay}>
          <div className={styles.Modal}>
            <h2>습관 목록</h2>

            <div className={styles.ModalHabitList}>
              {editHabits.map((habit) => (
                <div key={habit.id} className={styles.ModalHabitItem}>
                  <input
                    value={habit.text}
                    onChange={(e) =>
                      handleChangeHabit(habit.id, e.target.value)
                    }
                    placeholder='습관을 입력하세요'
                  />

                  <button
                    type='button'
                    className={styles.DeleteButton}
                    onClick={() => handleDeleteHabit(habit.id)}
                  >
                    🗑
                  </button>
                </div>
              ))}

              <button
                type='button'
                className={styles.AddButton}
                onClick={handleAddHabit}
              >
                +
              </button>
            </div>

            <div className={styles.ModalButtons}>
              <button type='button' onClick={handleCloseEditModal}>
                취소
              </button>

              <button type='button' onClick={handleSaveHabits}>
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HabitsPage;
