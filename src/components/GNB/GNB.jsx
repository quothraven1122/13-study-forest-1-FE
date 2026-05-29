import styles from './GNB.module.css';
import logo from '../../assets/imgs/logo.png';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';

function GNB() {
  const location = useLocation();
  return (
    <header className={styles.gnb}>
      <div className={styles.inner}>
        {location.pathname === '/' ? (
          <>
            <Link to='/' className={styles.logo}>
              <img src={logo} alt='공부의 숲 로고' />
            </Link>
            <Link to='/studies/new' className={styles.btn}>
              <Button>스터디 만들기</Button>
            </Link>
          </>
        ) : (
          <Link to='/' className={styles.logo}>
            <img src={logo} alt='공부의 숲 로고' />
          </Link>
        )}
      </div>
    </header>
  );
}

export default GNB;
