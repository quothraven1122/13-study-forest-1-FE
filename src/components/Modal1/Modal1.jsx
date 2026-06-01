import ic_trash from '../../assets/icons/ic_trash.png';
import ic_plus from '../../assets/icons/ic_plus.svg';
import styles from './Modal1.module.css';
import { useState } from 'react';
export default function Modal1({ habits, onSave, onCancel }) {
  const [localHabits, setLocalHabits] = useState(habits.map((h) => ({ ...h })));
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
    setLocalHabits((prev) => [
      ...prev,
      {
        tempId: Date.now(),
        name: '',
        isDone: false,                                    //새로 추가한 습관 id 생성하므로 tempId 사용, 백엔드에서 id 생성되면 tempId로 대체할 예정
      },
    ]);
  };

  return (
    <div className={styles.modalOverlay}>
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

        <div className={styles.btnBox}>
          {/* 나중에 공용 버튼 컴포넌트로 변경 */}
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
//============================UI 확인용 코드===================================
// import ic_trash from '../../assets/icons/ic_trash.png';
// import ic_plus from '../../assets/icons/ic_plus.svg';
// import styles from './Modal1.module.css';
// import { useState } from 'react';
// export default function Modal1({ onSave, onCancel }) {

//   const [habits, setHabits] = useState([
//     {
//       id: 1,
//       name: '오늘의 습관',
//     },
//     {
//       id: 2,
//       name: '오늘의 습관',
//     },
//     {
//       id: 3,
//       name: '오늘의 습관',
//     },
//     {
//       id: 4,
//       name: '오늘의 습관',
//     },
//     {
//       id: 5,
//       name: '오늘의 습관',
//     },
//     {
//       id: 6,
//       name: '오늘의 습관',
//     },
//   ]);

//   const onChangeHabit = (id, value) => {
//     const updateHabits = habits.map((habit) =>
//       habit.id === id ? { ...habit, name: value } : habit
//     );
//     setHabits(updateHabits);
//   };

//   const onDeleteHabit = (id) => {
//     const filteredHabits = habits.filter((habit) => habit.id !== id);
//     setHabits(filteredHabits);
//   };

//   const onAddHabit = () => {
//     const newHabit = {
//       id: Date.now(),
//       name: '',
//     };
//     setHabits([...habits, newHabit]);
//   };
//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <p className={styles.title}>습관 목록</p>
//         <div className={styles.habitListBox}>
//           {habits.map((habit) => (
//             <div className={styles.habitBox} key={habit.id}>
//               <input
//                 type='text'
//                 className={styles.habit}
//                 value={habit.name}
//                 onChange={(e) => onChangeHabit(habit.id, e.target.value)}
//               />

//               <button
//                 className={styles.deleteBtn}
//                 onClick={() => onDeleteHabit(habit.id)}
//               >
//                 <img src={ic_trash} alt='습관 삭제' />
//               </button>
//             </div>
//           ))}
//         </div>
//         <button className={styles.addBtn} type='button' onClick={onAddHabit}>
//           <img src={ic_plus} alt='습관 추가' />
//         </button>

//         <div className={styles.btnBox}>
//           {/* 나중에 공용 버튼 컴포넌트로 변경 */}
//           <button className={styles.cancelBtn} onClick={onCancel}>
//             취소
//           </button>
//           <button className={styles.saveBtn} onClick={onSave}>
//             수정완료
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
