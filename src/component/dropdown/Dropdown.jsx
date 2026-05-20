import styles from './dropdown.module.css';
import arrowIcon from '../../asset/icon/ic_toggle.svg';
import { useState } from 'react';

export default function Dropdown({
  options = [
    { value: 'recent', label: '최근 순' },
    { value: 'latest', label: '오래된 순' },
    { value: 'maxPoint', label: '많은 포인트 순' },
    { value: 'minPoint', label: '적은 포인트 순' },
  ],
  onChange = () => {},
  width = 180, //큰 버튼은 180 작은 버튼은 150으로 width설정
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0].label);

  return (
    <div
      className={styles.sortContainer}
      style={{ width }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.sortBox}>
        <p>{selectedValue}</p>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={arrowIcon} alt='arrow' />
        </button>
      </div>
      {isOpen && (
        <div className={styles.dropdownBox} style={{ width }}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setSelectedValue(option.label);
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
