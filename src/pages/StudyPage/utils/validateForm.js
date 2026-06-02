export const validateForm = (studyData, confirmPassword, isUpdate) => {
  const errors = {};
  if (!studyData.nickname.trim()) {
    errors.nickname = '닉네임을 입력해주세요';
  }
  if (!studyData.name.trim()) {
    errors.name = '스터디 이름을 입력해주세요';
  }
  if (!studyData.description.trim()) {
    errors.description = '소개를 작성해주세요';
  }
  if (!isUpdate && !studyData.password) {
    errors.password = '비밀번호를 입력해주세요';
  }
  if (!isUpdate && studyData.password !== confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다';
  }
  return errors;
};
