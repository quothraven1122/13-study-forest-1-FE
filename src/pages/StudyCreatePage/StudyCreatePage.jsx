import { useState } from 'react';
import StudyForm from './components/StudyForm';
export default function StudyCreatePage() {
  const [studyData, setStudyData] = useState({
    nickname: '',
    name: '',
    description: '',
    background:
      'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    password: '',
  });
  const createStudy = async (studyData) => {
    try {
      const res = await fetch('http://localhost:3000/studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...studyData }),
      });
      if (!res.ok) throw new Error('fetch 에러');
      const data = await res.json();
      return data;
    } catch (err) {
      alert(err.message);
    }
  };
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
