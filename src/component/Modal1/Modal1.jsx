import ic_trash from '../../asset/icon/ic_trash.svg';
import ic_plus from '../../asset/icon/ic_plus.svg';
export default function Modal1(onCancel, onSave,) {
  const onChangeHabit = () => {};
  const onAddHabit = () => {};
  const onDeleteHabit = () => {};
  const DummyHabits = [
    { id: 1, name: '미라클 모닝 6시 기상' },
    { id: 2, name: '미라클 모닝 6시 기상' },
  ];
  return (
    <div>
      <div>
        <p>습관 목록</p>
        <div>
          {DummyHabits.map((habit) => {
            return (
              <div key={habit.id}>
                <input
                  value={habit.name}
                  onChange={(e) => onChangeHabit(habit.id, e.target.value)}
                />

                <button onClick={() => onDeleteHabit(habit.id)}>
                  <img src={ic_trash} alt='삭제 버튼' />
                </button>
              </div>
            );
          })}
        </div>

        <button onClick={onAddHabit}>
          <img src={ic_plus} alt='추가버튼' />
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
