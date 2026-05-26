import Dropdown from '../../components/Dropdown/Dropdown.jsx';
import Tag from '../../components/Tag/Tag.jsx';
import styles from './HomePage.module.css';

import { useRef } from 'react';
import search from '../../assets/icons/ic_search.svg';
import { Link } from 'react-router-dom';
function HomePage() {
  // const [studies, setStudies] = useState([])
  const isDragging = useRef(false);
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;

    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    isDragging.current = true;

    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;

    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const studies = [
    {
      id: 1,
      name: 'UX 스터디',
      nickname: '이유디',
      description: 'Slow And Steady Wins The Race!!',
      point: 310,
      reaction: { '👩🏻‍💻': 37, '🔥': 26, '🤍': 14 },
      daysCount: 68,
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    },
    {
      id: 2,
      name: 'UX 스터디',
      nickname: '이유디',
      description: 'Slow And Steady Wins The Race!!',
      point: 310,
      reaction: { '👩🏻‍💻': 37, '🔥': 26, '🤍': 14 },
      daysCount: 68,
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    },
    {
      id: 3,
      name: 'UX 스터디',
      nickname: '이유디',
      description: 'Slow And Steady Wins The Race!!',
      point: 310,
      reaction: { '👩🏻‍💻': 37, '🔥': 26, '🤍': 14 },
      daysCount: 68,
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    },
    {
      id: 4,
      name: 'UX 스터디',
      nickname: '이유디',
      description: 'Slow And Steady Wins The Race!!',
      point: 310,
      reaction: { '👩🏻‍💻': 37, '🔥': 26, '🤍': 14 },
      daysCount: 68,
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    },
    {
      id: 5,
      name: 'UX 스터디',
      nickname: '이유디',
      description: 'Slow And Steady Wins The Race!!',
      point: 310,
      reaction: { '👩🏻‍💻': 37, '🔥': 26, '🤍': 14 },
      daysCount: 68,
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    },
    {
      id: 6,
      name: 'UX 스터디',
      nickname: '이유디',
      description: 'Slow And Steady Wins The Race!!',
      point: 310,
      reaction: { '👩🏻‍💻': 37, '🔥': 26, '🤍': 14 },
      daysCount: 68,
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20241124/pngtree-celestial-circle-of-light-in-space-emitting-a-soft-glow-amidst-image_16630308.jpg',
    },
  ];

  function StudyCard({ study }) {
    return (
      <Link
        draggable={false}
        onClick={(e) => {
          if (isDragging.current) {
            e.preventDefault();
          }
        }}
        to={`/study/${study.id}`}
        className={styles.studyCard}
        style={{ backgroundImage: `url(${study.background})` }}
      >
        <div className={styles.studyInfoBox}>
          <div className={styles.studyInfo}>
            <div className={styles.studyCardTopBox}>
              <div className={styles.studyTitleBox}>
                <p className={styles.studyTitle}>
                  {study.nickname}의 {study.name}
                </p>
                <div className={styles.point}>
                  <Tag type='small' point={study.point} status='dark' />
                </div>
              </div>
              <p className={styles.daysCount}>{study.daysCount}일째 진행 중</p>
            </div>

            <p className={styles.studyDescription}>{study.description}</p>
          </div>
          <div className={styles.reactionBox}>
            {Object.entries(study.reaction).map(([emoji, count]) => (
              <Tag type='small' key={emoji} status='dark'>
                {emoji} {count}
              </Tag>
            ))}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <div className={styles.main}>
      <section className={styles.recentSection}>
        <p className={styles.title}>최근 조회한 스터디</p>
        <div className={styles.recentStudiesArea}>
          {studies.length === 0 ? (
            <p className={styles.text}>아직 조회한 스터디가 없어요</p>
          ) : (
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={styles.recentStudyCardGrid}
            >
              {studies.slice(0, 3).map((study) => (
                <StudyCard key={study.id} study={study} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className={styles.studiesSection}>
        <p className={styles.title}>스터디 둘러보기</p>
        <div className={styles.filterBar}>
          <div className={styles.searchBar}>
            <img src={search} alt='습관 검색' />
            <input className={styles.search} type='text' placeholder='검색' />
          </div>
          <Dropdown />
        </div>
        <div
          className={
            studies.length === 0 ? styles.emptyStudiesArea : styles.studiesArea
          }
        >
          {studies.length === 0 ? (
            <p className={styles.text}>아직 둘러 볼 스터디가 없어요</p>
          ) : (
            <div className={styles.studyCardArea}>
              <div className={styles.studyCardGrid}>
                {studies.map((study) => (
                  <StudyCard key={study.id} study={study} />
                ))}
              </div>
              <button className={styles.moreBtn}>더보기</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
