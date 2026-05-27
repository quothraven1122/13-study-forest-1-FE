import { Outlet } from 'react-router-dom';
import GNB from '../components/GNB/GNB';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <GNB />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
