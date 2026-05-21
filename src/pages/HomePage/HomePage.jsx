import Dropdown from '../../components/Dropdown/Dropdown.jsx';
import Tag from '../../components/Tag/Tag.jsx';
import styles from './HomePage.module.css';
import search from '../../assets/icons/ic_search.svg';
function HomePage() {
  // const [studies, setStudies] = useState([])

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
      <div
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
      </div>
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
            <div className={styles.studyCardGrid}>
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
