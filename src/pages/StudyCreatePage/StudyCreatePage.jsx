import { useState } from 'react';
import styles from './StudyCreatePage.module.css';
import Input from '../../components/Input/Input';
import testImg from '../../assets/imgs/logo.png';
import Button from '../../components/Button/Button';

function StudyCreatePage() {
  const [studyData, setStudyData] = useState({
    nickname: '',
    name: '',
    description: '',
    background: 'testImg',
    password: '',
  });
  console.log(studyData);

  const [confirmPassword, setConfirmPassword] = useState('');

  const backgrounds = [
    testImg,
    testImg,
    testImg,
    testImg,
    testImg,
    testImg,
    testImg,
    testImg,
  ];

  const validateForm = (studyData, confirmPassword) => {
    const errors = {};
    if (!studyData.nickname.trim('')) {
      errors.nickname = '닉네임을 입력해주세요';
    }
    if (!studyData.name.trim('')) {
      errors.name = '스터디 이름을 입력해주세요';
    }
    if (!studyData.description) {
      errors.description = '소개를 작성해주세요';
    }
    if (!studyData.password) {
      errors.password = '비밀번호를 입력해주세요';
    }
    if (studyData.password !== confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }
    return errors;
  };

  const errors = validateForm(studyData, confirmPassword);
  console.log(errors);

  return (
    <div className={styles.createContainer}>
      <form className={styles.createBox}>
        <h2>스터디 만들기</h2>
        <div className={styles.formField}>
          <p>닉네임</p>
          <Input
            style={
              errors.nickname && {
                border: '1px solid var(--red-error_C41013, #C41013)',
              }
            }
            value={studyData.nickname}
            onChange={(e) =>
              setStudyData((prev) => ({ ...prev, nickname: e.target.value }))
            }
            placeholder='닉네임을 입력해 주세요'
          />
          {errors.nickname && <span>*닉네임을 입력해주세요</span>}
        </div>

        <div className={styles.formField}>
          <p>스터디 이름</p>
          <Input
            style={
              errors.name && {
                border: '1px solid var(--red-error_C41013, #C41013)',
              }
            }
            value={studyData.name}
            onChange={(e) =>
              setStudyData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder='스터디 이름을 입력해주세요'
          />
          {errors.name && <span>*이름을 입력해주세요</span>}
        </div>

        <div className={styles.formField}>
          <p>소개</p>
          <Input
            style={
              errors.description && {
                border: '1px solid var(--red-error_C41013, #C41013)',
              }
            }
            value={studyData.description}
            onChange={(e) =>
              setStudyData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder='소개 멘트를 작성해 주세요'
            textarea
          />
          {errors.description && <span>*소개를 입력해주세요</span>}
        </div>

        <div className={styles.formField}>
          <p>배경을 선택해주세요</p>
          <div className={styles.imageGrid}>
            {/* <input
                type='radio'
                name='background'
                value={testImg}
                checked={true}
              /> */}
            {backgrounds.map((background, index) => (
              <label key={index} className={styles.imageBox}>
                <input
                  type='radio'
                  name='background'
                  value={background}
                  onChange={(e) =>
                    setStudyData((prev) => ({
                      ...prev,
                      background: e.target.value,
                    }))
                  }
                />
                <img src={background} alt='배경이미지' />
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formField}>
          <p>비밀번호</p>
          <Input
            style={
              errors.password && {
                border: '1px solid var(--red-error_C41013, #C41013)',
              }
            }
            value={studyData.password}
            onChange={(e) =>
              setStudyData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder='비밀번호를 입력해 주세요'
            passwordToggle={true}
          />
          {errors.password && <span>*비밀번호를 입력해주세요</span>}
        </div>

        <div className={styles.formField}>
          <p>비밀번호 확인</p>
          <Input
            style={
              errors.confirmPassword && {
                border: '1px solid var(--red-error_C41013, #C41013)',
              }
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='비밀번호를 다시 한 번 입력해 주세요'
            passwordToggle={true}
          />
          {errors.confirmPassword && <span>*비밀번호가 일치하지 않습니다</span>}
        </div>
        <Button>만들기</Button>
      </form>
    </div>
  );
}

export default StudyCreatePage;
