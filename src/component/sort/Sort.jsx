import styles from './sort.module.css';
import arrowIcon from '../../asset/icon/ic_toggle.svg';

export default function Sort({
  sortOptions = '최근 순',
  onClick,
  width = 180, //큰 sort버튼은 180 작은 sort버튼은 150으로 설정
}) {
  return (
    <div className={styles.sortContainer} style={{ width }}>
      <div className={styles.sortBox}>
        <p>{sortOptions}</p>
        <button onClick={onClick}>
          <img src={arrowIcon} alt='arrow' />
        </button>
      </div>
    </div>
  );
}
