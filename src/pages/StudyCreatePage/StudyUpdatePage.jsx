import { useParams } from 'react-router-dom';
import StudyForm from './StudyForm';
import { useEffect, useState } from 'react';
import { getStudyDetail } from '../../apis/studyDetail';

export default function StudyUpdatePage() {
  const { studyId } = useParams();
  const updateStudy = async (studyData) => {
    try {
      const res = await fetch(`http://localhost:3000/studies/${studyId}`, {
        method: 'PATCH',
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
  const [studyData, setStudyData] = useState(null);

  useEffect(() => {
    async function getStudy() {
      const data = await getStudyDetail(studyId);
      setStudyData({ ...data, password: '' });
    }
    getStudy();
  }, []);

  if (!studyData) return null;

  return (
    <>
      <StudyForm
        onSubmitForm={updateStudy}
        title='스터디 수정하기'
        btnText='수정완료'
        studyData={studyData}
        setStudyData={setStudyData}
      />
    </>
  );
}
