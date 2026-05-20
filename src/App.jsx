import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudyCreatePage from './pages/StudyCreatePage';
import StudyDetailPage from './pages/StudyDetailPage';
import HabitsPage from './pages/HabitsPage';
import FocusPage from './pages/FocusPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/studies/new' element={<StudyCreatePage />} />
      <Route path='/studies/:studyId' element={<StudyDetailPage />} />
      <Route path='/studies/:studyId/habits' element={<HabitsPage />} />
      <Route path='/studies/:studyId/focus' element={<FocusPage />} />
    </Routes>
  );
}

export default App;
