import styles from './sort.module.css';
import arrowIcon from '../../asset/icon/ic_toggle.svg';

export default function Sort({ sortOptions = '최근 순', onClick }) {
  return (
    <div className={styles.sortContainer}>
      <div className={styles.sortBox}>
        <p>{sortOptions}</p>
        <button onClick={onClick}>
          <img src={arrowIcon} alt='arrow' />
        </button>
      </div>
    </div>
  );
}
