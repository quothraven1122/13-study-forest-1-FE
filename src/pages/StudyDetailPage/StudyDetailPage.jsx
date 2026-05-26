import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import EmojiPicker from 'emoji-picker-react';

import useDate from '../../hooks/useDate';
import useResponsiveWidth from '../../hooks/useResponsiveWidth';

import Button from '../../components/Button/Button';
import Tag from '../../components/Tag/Tag';
import Sticker from '../../components/Sticker/Sticker';
import Modal2 from '../../components/Modal2/Modal2';
import Input from '../../components/Input/Input';

import { getStudyDetail, checkPassword } from '../../apis/studyDetail';
import modalText from '../../components/Modal2/modalConstant';
import arrowRight from '../../assets/icons/ic_arrow_right.svg';
import smile from '../../assets/icons/ic_smile.svg';
import styles from './StudyDetailPage.module.css';

function StudyDetailPage() {
  const date = new Date();

  const navigate = useNavigate();
  const size = useResponsiveWidth();
  const { getDaysOfWeek, compareDates } = useDate();

  const [isMoreEmojiOpen, setIsMoreEmojiOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [pwInput, setPwInput] = useState('');

  const { studyId } = useParams();
  const { data } = useQuery({
    queryKey: ['study', studyId],
    queryFn: () => getStudyDetail(studyId),
  });
  const checkPWMutation = useMutation({
    mutationFn: checkPassword,
    onSuccess: () => {
      if (modalType === 'habits' || modalType === 'focus')
        navigate(`/studies/${studyId}/${modalType}`);
      if (modalType === 'edit') navigate(`/studies/${studyId}/habits`);
    },
  });

  return (
    <div className={styles.page}>
      {isModalOpen && (
        <Modal2
          title={data?.name}
          message='권한이 필요해요!'
          btnText={modalText[modalType]}
          onExit={() => setIsModalOpen(false)}
          onClick={() => {
            checkPWMutation.mutate(studyId, pwInput);
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
          {data ? (
            <div className={styles.tags}>
              {Object.entries(data?.reactions)
                .slice(0, 3)
                .map(([key, value], index) => (
                  <Tag status='dark' key={index}>
                    {key}
                    {value}
                  </Tag>
                ))}
              {Object.keys(data?.reactions).length > 3 && (
                <>
                  <div
                    onClick={() => setIsMoreEmojiOpen((prev) => !prev)}
                    className={styles.moreTagsContainer}
                  >
                    <Tag className={styles.moreTags}>
                      {`+  ${Object.keys(data?.reactions).length - 3}..`}
                    </Tag>
                    {isMoreEmojiOpen && (
                      <div className={styles.moreTagsContent}>
                        {Object.entries(data?.reactions)
                          .slice(3)
                          .map(([key, value], index) => (
                            <Tag status='dark' key={index}>
                              {key}
                              {value}
                            </Tag>
                          ))}
                      </div>
                    )}
                  </div>
                </>
              )}
              <div onClick={() => setIsPickerOpen((prev) => !prev)}>
                <Tag className={styles.addTag}>
                  <img src={smile} />
                  추가
                </Tag>
                <div className={styles.emojiPickerContainer}>
                  {isPickerOpen && (
                    <EmojiPicker
                      onEmojiClick={(emojiObject) =>
                        setEmoji(emojiObject.emoji)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
          {size === 'desktop' && (
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
        </div>

        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{data?.name}</h2>
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
          <p className={styles.description}>{data?.description}</p>
        </div>
        <div className={styles.pointContainer}>
          <p className={styles.descriptionText}>현재까지 획득한 포인트</p>
          <Tag point={data?.point} />
        </div>

        <div className={styles.recordTable}>
          <h2 className={styles.tableTitle}>습관 기록표</h2>
          {data && Object.keys(data?.habits || {}).length !== 0 ? (
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
                {Object.entries(data?.habits).map(([key, value], index1) => (
                  <tr key={index1}>
                    <td className={styles.habitName}>{key}</td>
                    {getDaysOfWeek(date).map((d, index2) => {
                      if (value.some((h) => compareDates(new Date(h), d))) {
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
          ) : (
            <p className={styles.emptyMessage}>
              아직 습관이 없어요 <br />
              오늘의 습관에서 습관을 생성해보세요
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyDetailPage;
