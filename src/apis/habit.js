export const getHabits = async (studyId) => {
  const response = await fetch(
    `http://localhost:3000/studies/${studyId}/habits`
  );

  if (!response.ok) {
    throw new Error('습관 목록 조회에 실패했습니다.');
  }

  return response.json();
};

export const createHabit = async (studyId, data) => {
  const response = await fetch(
    `http://localhost:3000/studies/${studyId}/habits`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('습관 생성에 실패했습니다.');
  }

  return response.json();
};

export const updateHabit = async (studyId, habitId, data) => {
  const response = await fetch(
    `http://localhost:3000/studies/${studyId}/habits/${habitId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('습관 수정에 실패했습니다.');
  }

  return response.json();
};

export const deleteHabit = async (studyId, habitId) => {
  const response = await fetch(
    `http://localhost:3000/studies/${studyId}/habits/${habitId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('습관 삭제에 실패했습니다.');
  }

  return true;
};
