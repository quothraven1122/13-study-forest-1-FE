import { Outlet } from 'react-router-dom';
import GNB from '../components/GNB/GNB';

export default function MainLayout() {
  return (
    <div>
      <GNB />
      <Outlet />
    </div>
  );
}
