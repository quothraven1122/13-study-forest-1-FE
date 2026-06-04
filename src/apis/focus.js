export const getFocusDetail = async (studyId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/studies/${studyId}/focus`
  );
  return response.json();
};

export const patchFocusPoints = async (studyId, points) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/studies/${studyId}/focus`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points }),
    }
  );
  if (!response.ok) throw new Error('서버 오류');
  return response.json();
};
