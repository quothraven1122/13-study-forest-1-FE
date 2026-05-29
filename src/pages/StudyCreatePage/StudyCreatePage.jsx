import StudyForm from './StudyForm';
export default function StudyCreatePage() {
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
      />
    </>
  );
}
