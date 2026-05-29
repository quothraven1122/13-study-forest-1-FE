import { useState } from 'react';
import styles from './StudyCreatePage.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

function FormField({ error, Data, label, ...inputprops }) {
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
        {...inputprops}
      />
      {error && <span>*{error}</span>}
    </div>
  );
}

function StudyForm({ onSubmitForm, title, btnText }) {
  const validateForm = (studyData, confirmPassword) => {
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
    if (!studyData.password) {
      errors.password = '비밀번호를 입력해주세요';
    }
    if (studyData.password !== confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }
    return errors;
  };

  const [studyData, setStudyData] = useState({
    nickname: '',
    name: '',
    description: '',
    background:
      'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const backgrounds = [
    'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    'https://i.namu.wiki/i/v_zK7er3cBXRkKPgXQKyFnRNCBOmGDKRwDGUI92DDImUKG2kFa8RLZrJdeEZCXnpj8Lsp1efiIFkNwJhQNo3lw.webp',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/AcetoFive.JPG/1280px-AcetoFive.JPG',
    'https://cdn.imweb.me/upload/S201901155c3d45c030b1a/5c3f4bd73e009.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIzS6jib8UzBdBBDr9TFsZY0qs6SLqoQU_Eg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJTI80aFfSGs-0JhK54lx5bzzt2MlN5I23bQ&s',
    'https://i.namu.wiki/i/0SGoftrehJuPefLVXRPwjyDlkqg0bCp6ZEj4JsHtSDH-WyEIB4I2vdcCDZ_hM4YrHG8jKFytvfoCDMmmgAWAlQ.webp',
    'https://i.namu.wiki/i/lZoMNR1GxpifZDc57AIQdBBTqsqmIjSkhMhx6CiMjOx9Dcw3AyI-HHU5yKemfGyW20zUrL53hnC91o9zIZj1IQ.webp',
  ];

  const navigate = useNavigate();

  // const updateStudy= async ()=>{
  //   try{
  //     const res=await fetch('http://localhost:3000/studies/:id',{
  //       method:'PATCH',
  //       headers:{'Content-Type':'application/json'},
  //       body:JSON.stringify({...studyData}),
  //     })
  //   }
  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(studyData, confirmPassword);
    setErrors(error);
    if (Object.keys(error).length > 0) return;
    const data = await onSubmitForm(studyData);
    navigate(`/studies/${data.id}`);
  };

  return (
    <div className={styles.createContainer}>
      <form className={styles.createBox} onSubmit={onSubmit}>
        <h2>{title}</h2>
        <FormField
          error={errors.nickname}
          Data={studyData.nickname}
          label='닉네임'
          placeholder='닉네임을 입력해 주세요'
          onChange={(e) => {
            setStudyData((prev) => ({ ...prev, nickname: e.target.value }));
            setErrors((prev) => ({ ...prev, nickname: null }));
          }}
        />

        <FormField
          error={errors.name}
          Data={studyData.name}
          label='스터디 이름'
          placeholder='스터디 이름을 입력해주세요'
          onChange={(e) => {
            setStudyData((prev) => ({ ...prev, name: e.target.value }));
            setErrors((prev) => ({ ...prev, name: null }));
          }}
        />

        <FormField
          error={errors.description}
          Data={studyData.description}
          label='소개'
          placeholder='소개 멘트를 작성해 주세요'
          onChange={(e) => {
            setStudyData((prev) => ({ ...prev, description: e.target.value }));
            setErrors((prev) => ({ ...prev, description: null }));
          }}
          textarea
        />

        <div className={styles.formField}>
          <p>배경을 선택해주세요</p>
          <div className={styles.imageGrid}>
            {backgrounds.map((background) => (
              <label key={background} className={styles.imageBox}>
                <input
                  type='radio'
                  name='background'
                  value={background}
                  checked={background === studyData.background}
                  onChange={(e) => {
                    setStudyData((prev) => ({
                      ...prev,
                      background: e.target.value,
                    }));
                    setErrors((prev) => ({ ...prev, background: null }));
                  }}
                />
                <img src={background} alt={`배경이미지`} />
              </label>
            ))}
          </div>
        </div>

        <FormField
          error={errors.password}
          Data={studyData.password}
          label='비밀번호'
          placeholder='비밀번호를 입력해 주세요'
          onChange={(e) => {
            setStudyData((prev) => ({ ...prev, password: e.target.value }));
            setErrors((prev) => ({ ...prev, password: null }));
          }}
          passwordToggle={true}
        />

        <FormField
          error={errors.confirmPassword}
          Data={confirmPassword}
          label='비밀번호 확인'
          placeholder='비밀번호를 다시 한 번 입력해 주세요'
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirmPassword: null }));
          }}
          passwordToggle={true}
        />
        <Button type='submit'>{btnText}</Button>
      </form>
    </div>
  );
}

export default StudyForm;
