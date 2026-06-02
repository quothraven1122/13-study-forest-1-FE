import styles from './Dropdown.module.css';
import arrowIcon from '../../assets/icons/ic_toggle.svg';
import { useState } from 'react';

export default function Dropdown({
  options = [
    { value: 'recent', label: '최근 순' },
    { value: 'oldest', label: '오래된 순' },
    { value: 'highPoint', label: '많은 포인트 순' },
    { value: 'lowPoint', label: '적은 포인트 순' },
  ],
  value,
  onChange = () => {},
  width = 180,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || options[0].label;

  return (
    <div className={styles.sortContainer} style={{ width }}>
      {/* 버튼 */}
      <div className={styles.sortBox}>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <p>{selectedLabel}</p>
          <img src={arrowIcon} alt='arrow' />
        </button>
      </div>

      {/* 옵션 */}
      {isOpen && (
        <div className={styles.dropdownBox} style={{ width }}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
