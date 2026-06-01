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

  if (!response.ok) {
    throw new Error('비밀번호가 틀렸습니다.');
  }

  return response.json();
};
export const postEmoji = async (studyId, data) => {
  const response = await fetch(
    `http://localhost:3000/studies/${studyId}/emoji`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
};
export const deleteStudy = async (studyId, data) => {
  const response = await fetch(`http://localhost:3000/studies/${studyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
  return result;
};
