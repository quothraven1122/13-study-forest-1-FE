export const getStudies = async (
  searchValue = '',
  pageNum = 1,
  sortValue = 'recent'
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/studies?search=${searchValue}&page=${pageNum}&sort=${sortValue}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.errors?.[0]?.message || '스터디 목록 조회에 실패했습니다.'
    );
  }

  return response.json();
};
