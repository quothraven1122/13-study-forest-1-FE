import { useState } from 'react';
import StudyForm from './components/StudyForm';
import { createStudy } from '../../apis/study';
export default function StudyCreatePage() {
  const [studyData, setStudyData] = useState({
    nickname: '',
    name: '',
    description: '',
    background:
      'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    password: '',
  });
  return (
    <>
      <StudyForm
        onSubmitForm={createStudy}
        title='스터디 만들기'
        btnText='만들기'
        studyData={studyData}
        setStudyData={setStudyData}
      />
    </>
  );
}
