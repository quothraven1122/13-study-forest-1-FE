import { Outlet } from 'react-router-dom';
import GNB from '../components/GNB/GNB';
import styles from './MainLayout.module.css';
import FocusPage from '../pages/FocusPage/FocusPage';

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <GNB />
      <main className={styles.content}>
        {/* <Outlet /> */}
        <FocusPage />
      </main>
    </div>
  );
}
