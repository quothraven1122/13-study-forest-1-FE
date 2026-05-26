export const getStudyDetail = async (studyId) => {
  const response = await fetch(`http://localhost:3000/studies/${studyId}`);
  return response.json();
};
export const checkPassword = async (studyId, data) => {
  const response = await fetch(
    `http://localhost:3000/studies/${studyId}/confirm-pw`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
