export const createStudy = async (studyData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/studies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...studyData }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message}`);
    }
    return data;
  } catch (err) {
    alert(err.message);
  }
};

export const updateStudy = async (studyData, studyId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/studies/${studyId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...studyData }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    alert(err.message);
  }
};
