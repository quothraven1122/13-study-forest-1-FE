import styles from './GNB.module.css';
import logo from '../asset/img/logo.png';

function GNB() {
  return (
    <header className={styles.gnb}>
      <div className={styles.inner}>
        <a href='/' className={styles.logo}>
          <img src={logo} alt='공부의 숲 로고' />
        </a>
      </div>
    </header>
  );
}

export default GNB;
