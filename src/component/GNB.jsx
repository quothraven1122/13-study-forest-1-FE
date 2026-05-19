import styles from './GNB.module.css';
import logo from '../assets/img/logo.png'; // 로고 이미지 경로 (실제 파일명에 맞게 수정)

function GNB() {
  return (
    <header className={styles.gnb}>
      <div className={styles.inner}>
        {/* 로고 */}
        <a href="/" className={styles.logo}>
          <img src={logo} alt="공부의 숲 로고" />
        </a>

        {/* 스터디 만들기 버튼 */}
        <button className={styles.createBtn}>
          스터디 만들기
        </button>
      </div>
    </header>
  );
}

export default GNB;
