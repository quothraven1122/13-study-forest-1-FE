import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './HabitsPage.module.css';
import Chip from '../../components/Chip/Chip';
import arrowRight from '../../assets/icons/ic_arrow_right.svg';
import Modal1 from '../../components/Modal1/Modal1';
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

  // 오늘 날짜에 해당하는 habitLog가 있으면 완료 처리
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

  // 페이지 처음 들어왔을 때 백엔드에서 습관 목록과 스터디 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const habitsData = await getHabits(studyId);
        const studyData = await getStudyDetail(studyId);

        setHabits(habitsData);
        setStudy(studyData);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    fetchData();
  }, [studyId]);

  // 습관 완료/미완료 토글
  // 백엔드에서 오늘 habitLog가 있으면 삭제, 없으면 생성
  const handleToggleHabit = async (id) => {
    try {
      const updatedHabit = await updateHabit(studyId, id, {});

      setHabits((prevHabits) =>
        prevHabits.map((habit) => (habit.id === id ? updatedHabit : habit))
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // 모달에서 수정 완료 눌렀을 때
  const handleSaveHabits = async (savedHabits) => {
    const cleanHabits = savedHabits.filter((habit) => habit.name.trim() !== '');

    try {
      // 1. 삭제된 습관 찾기
      const deletedHabits = habits.filter(
        (habit) => !cleanHabits.some((savedHabit) => savedHabit.id === habit.id)
      );

      for (const habit of deletedHabits) {
        await deleteHabit(studyId, habit.id);
      }

      // 2. 새로 추가되거나 수정된 습관 처리
      const nextHabits = [];

      for (const habit of cleanHabits) {
        const originalHabit = habits.find((item) => item.id === habit.id);

        // 기존에 없던 습관이면 새로 생성
        if (!originalHabit) {
          const createdHabit = await createHabit(studyId, {
            name: habit.name,
          });

          nextHabits.push(createdHabit);
        } else {
          // 기존 습관이면 이름만 수정
          const updatedHabit = await updateHabit(studyId, habit.id, {
            name: habit.name,
          });

          nextHabits.push(updatedHabit);
        }
      }

      setHabits(nextHabits);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
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
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
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
                  text={habit.name}
                  isDone={isDoneToday(habit)}
                  onClick={() => handleToggleHabit(habit.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className={styles.ModalOverlay}>
          <Modal1
            habits={habits}
            onSave={handleSaveHabits}
            onCancel={handleCloseEditModal}
          />
        </div>
      )}
    </>
  );
}

export default HabitsPage;
