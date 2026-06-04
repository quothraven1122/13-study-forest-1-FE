import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getStudyDetail } from '../../apis/studyDetail';
import StudyForm from './components/StudyForm';
import { updateStudy } from '../../apis/study';

export default function StudyUpdatePage() {
  const { studyId } = useParams();
  const [studyData, setStudyData] = useState(null);

  useEffect(() => {
    async function getStudy() {
      const data = await getStudyDetail(studyId);
      setStudyData({ ...data, password: '' });
    }
    getStudy();
  }, []);

  if (!studyData) return null;

  function handleUpdateStudy(studyData) {
    return updateStudy(studyData, studyId);
  }

  return (
    <>
      <StudyForm
        onSubmitForm={handleUpdateStudy}
        title='스터디 수정하기'
        btnText='수정완료'
        studyData={studyData}
        setStudyData={setStudyData}
        isUpdate={true}
      />
    </>
  );
}
