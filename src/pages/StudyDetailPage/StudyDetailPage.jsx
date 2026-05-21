import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

import useDate from '../../hooks/useDate';
import useResponsiveWidth from '../../hooks/useResponsiveWidth';

import Button from '../../components/Button/Button';
import Tag from '../../components/Tag/Tag';
import Sticker from '../../components/Sticker/Sticker';
import Modal2 from '../../components/Modal2/Modal2';
import Input from '../../components/Input/Input';

import modalText from '../../components/Modal2/modalConstant';
import arrowRight from '../../assets/icons/ic_arrow_right.svg';
import smile from '../../assets/icons/ic_smile.svg';
import styles from './StudyDetailPage.module.css';

const dummyDate = new Date('2026-05-23'); //Date.now()로 나중에 교체
const dummy = {
  id: 1, //studyId
  name: '연우의 개발공장',
  description: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)',
  point: 310,
  reactions: {
    '😄': 37,
    '👍': 20,
    '⭐': 5,
  },
  habits: {
    '미라클모닝 6시 기상': [
      new Date('2026-05-18'),
      new Date('2026-05-20'),
      new Date('2026-05-21'),
      new Date('2026-05-23'),
    ],
    '아침 챙겨 먹기': [new Date('2026-05-18'), new Date('2026-05-19')],
    'React 스터디 책 1챕터 읽기': [new Date('2026-05-18')],
    스트레칭: [],
    '사이드 프로젝트': [],
    '물 2L 마시기': [],
  },
};

function StudyDetailPage() {
  const navigate = useNavigate();
  const size = useResponsiveWidth();
  const { getDaysOfWeek, compareDates } = useDate();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [pwInput, setPwInput] = useState('');

  return (
    <div className={styles.page}>
      {isModalOpen && (
        <Modal2
          title={dummy.name}
          message='권한이 필요해요!'
          btnText={modalText[modalType]}
          onExit={() => setIsModalOpen(false)}
          onClick={() => {
            if (modalType === 'habits' || modalType === 'focus')
              navigate(`/studies/${dummy.id}/${modalType}`);
            if (modalType === 'edit') navigate(`/studies/${dummy.id}/habits`);
          }}
        >
          <div className={styles.inputContainer}>
            <p className={styles.inputText}>비밀번호</p>
            <Input
              placeholder='비밀번호를 입력해 주세요'
              passwordToggle={true}
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
            />
          </div>
        </Modal2>
      )}
      <div className={styles.container}>
        {size !== 'desktop' && (
          <div className={styles.options}>
            <p className={`${styles.highlightedOption} ${styles.option}`}>
              공유하기
            </p>
            |
            <p
              onClick={() => {
                setIsModalOpen(true);
                setModalType('edit');
              }}
              className={`${styles.highlightedOption} ${styles.option}`}
            >
              수정하기
            </p>
            |
            <p
              onClick={() => {
                setIsModalOpen(true);
                setModalType('erase');
              }}
              className={styles.option}
            >
              스터디 삭제하기
            </p>
          </div>
        )}

        <div className={styles.top}>
          <div className={styles.tags}>
            {Object.entries(dummy.reactions).map(([key, value], index) => (
              <Tag status='dark' key={index}>
                {key}
                {value}
              </Tag>
            ))}
            <div onClick={() => setIsPickerOpen((prev) => !prev)}>
              <Tag className={styles.addTag}>
                <img src={smile} />
                추가
              </Tag>
              <div className={styles.emojiPickerContainer}>
                {isPickerOpen && (
                  <EmojiPicker
                    onEmojiClick={(emojiObject) => setEmoji(emojiObject.emoji)}
                  />
                )}
              </div>
            </div>
          </div>
          {size === 'desktop' && (
            <div className={styles.options}>
              <p className={`${styles.highlightedOption} ${styles.option}`}>
                공유하기
              </p>
              |
              <p className={`${styles.highlightedOption} ${styles.option}`}>
                수정하기
              </p>
              |<p className={styles.option}>스터디 삭제하기</p>
            </div>
          )}
        </div>

        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{dummy.name}</h2>
          <div className={styles.btnsContainer}>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setModalType('habits');
              }}
              className={styles.btn}
            >
              <div className={styles.btnContent}>
                <p>오늘의 습관</p>
                <img src={arrowRight} />
              </div>
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setModalType('focus');
              }}
              className={styles.btn}
            >
              <div className={styles.btnContent}>
                <p>오늘의 집중</p>
                <img src={arrowRight} />
              </div>
            </Button>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>소개</p>
          <p className={styles.description}>{dummy.description}</p>
        </div>
        <div className={styles.pointContainer}>
          <p className={styles.descriptionText}>현재까지 획득한 포인트</p>
          <Tag point={dummy.point} />
        </div>

        <div className={styles.recordTable}>
          <h2 className={styles.tableTitle}>습관 기록표</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th className={styles.day}>월</th>
                <th className={styles.day}>화</th>
                <th className={styles.day}>수</th>
                <th className={styles.day}>목</th>
                <th className={styles.day}>금</th>
                <th className={styles.day}>토</th>
                <th className={styles.day}>일</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dummy.habits).map(([key, value], index1) => (
                <tr key={index1}>
                  <td className={styles.habitName}>{key}</td>
                  {getDaysOfWeek(dummyDate).map((d, index2) => {
                    if (value.some((h) => compareDates(h, d))) {
                      return (
                        <td key={index2} className={styles.log}>
                          <Sticker className={styles.doneSticker} />
                        </td>
                      );
                    }
                    return (
                      <td key={index2} className={styles.log}>
                        <Sticker className={styles.notDoneSticker} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudyDetailPage;
