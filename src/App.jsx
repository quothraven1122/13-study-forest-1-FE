import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import StudyCreatePage from './pages/StudyCreatePage/StudyCreatePage';
import StudyDetailPage from './pages/StudyDetailPage/StudyDetailPage';
import HabitsPage from './pages/HabitsPage/HabitsPage';
import FocusPage from './pages/FocusPage/FocusPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import StudyUpdatePage from './pages/StudyCreatePage/StudyUpdatePage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='studies/new' element={<StudyCreatePage />} />
        <Route path='studies/:studyId/update' element={<StudyUpdatePage />} />
        <Route path='studies/:studyId' element={<StudyDetailPage />} />
        <Route path='studies/:studyId/habits' element={<HabitsPage />} />
        <Route path='studies/:studyId/focus' element={<FocusPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
