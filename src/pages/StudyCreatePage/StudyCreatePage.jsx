import { useState } from 'react';
import styles from './StudyCreatePage.module.css';
import Input from '../../components/Input/Input';
import testImg from '../../assets/imgs/logo.png';
import Button from '../../components/Button/Button';

function StudyCreatePage() {
  const [studyData, setStudyData] = useState({
    nickname: '',
    studyname: '',
    description: '',
    backgroundimg: '',
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

  return (
    <>
      <div className={styles.createContainer}>
        <form className={styles.createBox}>
          <h2>스터디 만들기</h2>
          <div>
            <p>닉네임</p>
            <Input
              value={studyData.nickname}
              onChange={(e) =>
                setStudyData((prev) => ({ ...prev, nickname: e.target.value }))
              }
              placeholder='닉네임을 입력해 주세요'
            />
          </div>
          <div>
            <p>스터디 이름</p>
            <Input
              value={studyData.studyname}
              onChange={(e) =>
                setStudyData((prev) => ({ ...prev, studyname: e.target.value }))
              }
              placeholder='스터디 이름을 입력해주세요'
            />
          </div>
          <div>
            <p>소개</p>
            <Input
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
          </div>
          <div>
            <p>배경을 선택해주세요</p>
            <div className={styles.imageGrid}>
              {/* <input
                type='radio'
                name='backgroundimg'
                value={testImg}
                checked={true}
              /> */}
              {backgrounds.map((background, index) => (
                <label key={index} className={styles.imageBox}>
                  <input
                    type='radio'
                    name='backgroundImg'
                    value={background}
                    onChange={(e) =>
                      setStudyData((prev) => ({
                        ...prev,
                        backgroundimg: e.target.value,
                      }))
                    }
                  />
                  <img src={background} alt='배경이미지' />
                </label>
              ))}
            </div>
            <p>비밀번호</p>
            <Input
              value={studyData.password}
              onChange={(e) =>
                setStudyData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder='비밀번호를 입력해 주세요'
              passwordToggle='true'
            />
          </div>
          <div>
            <p>비밀번호 확인</p>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='비밀번호를 다시 한 번 입력해 주세요'
              passwordToggle='true'
            />
          </div>
          <Button>만들기</Button>
        </form>
      </div>
    </>
  );
}

export default StudyCreatePage;
