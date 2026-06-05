import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './HabitsPage.module.css';
import Chip from '../../components/Chip/Chip';
import arrowRight from '../../assets/icons/ic_arrow_right.svg';
import HabitModal from '../../components/HabitModal/HabitModal.jsx';
import { getStudyDetail } from '../../apis/studyDetail.js';

import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from '../../apis/habit.js';

function HabitsPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);

  const [habits, setHabits] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 저장 중인지 확인하는 상태
  const [isSaving, setIsSaving] = useState(false);

  // 어떤 습관을 토글 중인지 확인하는 상태
  const [togglingHabitId, setTogglingHabitId] = useState(null);

  const isDoneToday = (habit) => {
    const today = new Date();

    return habit.habitLogs?.some((log) => {
      const logDate = new Date(log.date);

      return (
        logDate.getFullYear() === today.getFullYear() &&
        logDate.getMonth() === today.getMonth() &&
        logDate.getDate() === today.getDate()
      );
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [habitsData, studyData] = await Promise.all([
          getHabits(studyId),
          getStudyDetail(studyId),
        ]);

        setHabits(habitsData);
        setStudy(studyData);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    fetchData();
  }, [studyId]);

  const handleToggleHabit = async (id) => {
    // 이미 다른 습관을 처리 중이면 중복 클릭 막기
    if (togglingHabitId === id) return;

    try {
      setTogglingHabitId(id);

      const updatedHabit = await updateHabit(studyId, id, {});

      setHabits((prevHabits) =>
        prevHabits.map((habit) => (habit.id === id ? updatedHabit : habit))
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setTogglingHabitId(null);
    }
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    if (isSaving) return;
    setIsEditModalOpen(false);
  };

  const handleSaveHabits = async (savedHabits) => {
    if (isSaving) return;

    const cleanHabits = savedHabits.filter((habit) => habit.name.trim() !== '');

    try {
      setIsSaving(true);

      const deletedHabits = habits.filter(
        (habit) => !cleanHabits.some((savedHabit) => savedHabit.id === habit.id)
      );

      const newHabits = cleanHabits.filter(
        (habit) => !habits.some((item) => item.id === habit.id)
      );

      const editedHabits = cleanHabits.filter((habit) => {
        const originalHabit = habits.find((item) => item.id === habit.id);
        return originalHabit && originalHabit.name !== habit.name;
      });

      await Promise.all([
        ...deletedHabits.map((habit) => deleteHabit(studyId, habit.id)),
        ...newHabits.map((habit) =>
          createHabit(studyId, {
            name: habit.name,
          })
        ),
        ...editedHabits.map((habit) =>
          updateHabit(studyId, habit.id, {
            name: habit.name,
          })
        ),
      ]);

      const habitsData = await getHabits(studyId);
      setHabits(habitsData);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoFocus = () => {
    navigate(`/studies/${studyId}/focus`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoStudyDetail = () => {
    navigate(`/studies/${studyId}`);
  };

  // 현재 시간을 관리하는 상태 (실시간으로 업데이트)
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <div className={styles.HeaderLeft}>
            <h1 className={styles.studyTitle}>
              {study?.nickname}의 {study?.name}
            </h1>

            <p>현재 시간</p>
            <span>{formattedDate}</span>
          </div>

          <div className={styles.HeaderRight}>
            <button
              type='button'
              className={styles.FocusButton}
              onClick={handleGoFocus}
            >
              오늘의 집중
              <img src={arrowRight} alt='화살표 아이콘' />
            </button>

            <button
              type='button'
              className={styles.DetailButton}
              onClick={handleGoStudyDetail}
            >
              습관 기록표
              <img src={arrowRight} alt='화살표 아이콘' />
            </button>

            <button
              type='button'
              className={styles.HomeButton}
              onClick={handleGoHome}
            >
              홈
              <img src={arrowRight} alt='화살표 아이콘' />
            </button>
          </div>
        </div>

        <div className={styles.Content}>
          <div className={styles.ContentHeader}>
            <h2>오늘의 습관</h2>

            <button
              type='button'
              onClick={handleOpenEditModal}
              disabled={isSaving}
            >
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
                  text={habit.name}
                  isDone={isDoneToday(habit)}
                  onClick={() => handleToggleHabit(habit.id)}
                  disabled={togglingHabitId === habit.id}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className={styles.ModalOverlay}>
          <HabitModal
            habits={habits}
            onSave={handleSaveHabits}
            onCancel={handleCloseEditModal}
            isSaving={isSaving}
          />
        </div>
      )}
    </>
  );
}

export default HabitsPage;
