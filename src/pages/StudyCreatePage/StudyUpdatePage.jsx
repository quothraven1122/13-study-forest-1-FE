import { useParams } from 'react-router-dom';
import StudyForm from './StudyForm';

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

  return (
    <>
      <StudyForm
        onSubmitForm={updateStudy}
        title='스터디 수정하기'
        btnText='수정완료'
      />
    </>
  );
}
