import { useState } from 'react';
import styles from './StudyCreatePage.module.css';
import Input from '../../components/Input/Input';
import testImg from '../../assets/imgs/logo.png';
import Button from '../../components/Button/Button';

function FormField({
  error,
  Data,
  label,
  placeholder,
  onChange,
  ...inputprops
}) {
  return (
    <div className={styles.formField}>
      <p>{label}</p>
      <Input
        style={
          error && {
            border: '1px solid var(--red-error_C41013, #C41013)',
          }
        }
        value={Data}
        placeholder={placeholder}
        onChange={onChange}
        {...inputprops}
      />
      {error && <span>*{error}</span>}
    </div>
  );
}

function StudyCreatePage() {
  const [studyData, setStudyData] = useState({
    nickname: '',
    name: '',
    description: '',
    background: 'testImg',
    password: '',
  });

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
    if (!studyData.nickname.trim()) {
      errors.nickname = '닉네임을 입력해주세요';
    }
    if (!studyData.name.trim()) {
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

  return (
    <div className={styles.createContainer}>
      <form className={styles.createBox}>
        <h2>스터디 만들기</h2>
        {/* <div className={styles.formField}>
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
        </div> */}
        <FormField
          error={errors.nickname}
          Data={studyData.nickname}
          label='닉네임'
          placeholder='닉네임을 입력해 주세요'
          onChange={(e) =>
            setStudyData((prev) => ({ ...prev, nickname: e.target.value }))
          }
        />

        <FormField
          error={errors.name}
          Data={studyData.name}
          label='스터디 이름'
          placeholder='스터디 이름을 입력해주세요'
          onChange={(e) =>
            setStudyData((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <FormField
          error={errors.description}
          Data={studyData.description}
          label='소개'
          placeholder='소개 멘트를 작성해 주세요'
          onChange={(e) =>
            setStudyData((prev) => ({ ...prev, description: e.target.value }))
          }
          textarea
        />

        <div className={styles.formField}>
          <p>배경을 선택해주세요</p>
          <div className={styles.imageGrid}>
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

        <FormField
          error={errors.password}
          Data={studyData.password}
          label='비밀번호'
          placeholder='비밀번호를 입력해 주세요'
          onChange={(e) =>
            setStudyData((prev) => ({ ...prev, password: e.target.value }))
          }
          passwordToggle={true}
        />

        {/* <div className={styles.formField}>
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
        </div> */}
        <FormField
          error={errors.confirmPassword}
          Data={studyData.confirmPassword}
          label='비밀번호 확인'
          placeholder='비밀번호를 다시 한 번 입력해 주세요'
          onChange={(e) => setConfirmPassword(e.target.value)}
          passwordToggle={true}
        />
        <Button>만들기</Button>
      </form>
    </div>
  );
}

export default StudyCreatePage;
