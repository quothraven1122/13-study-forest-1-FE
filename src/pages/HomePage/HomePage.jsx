import Dropdown from '../../components/Dropdown/Dropdown.jsx';
import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import searchIc from '../../assets/icons/ic_search.svg';
import { useLocation } from 'react-router-dom';

import { getStudyDetail } from '../../apis/studyDetail.js';

import useDebounce from '../../hooks/useDebounce.js';
import StudyCardSkeleton from './components/StudyCardSkeleton.jsx';
import StudyCard from './components/StudyCard.jsx';
import RecentStudiesSection from './components/RecentStudiesSection.jsx';
import { getStudies } from '../../apis/home.js';

function HomePage() {
  /// localStorage 스터디
  const RECENT_KEY = 'recent_studies';
  const [recentStudies, setRecentStudies] = useState([]);
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [studies, setStudies] = useState([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('recent');
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (page === 1) {
        setStudies([]);
      }
      setIsLoading(true);

      try {
        const data = await getStudies(debouncedSearch, page, sort);

        if (page === 1) {
          setStudies(data.data);
        } else {
          setStudies((prev) => [...prev, ...data.data]);
        }

        setHasNextPage(data.pagination.hasNextPage);
      } catch (error) {
        console.error('스터디 데이터 로딩 실패:', error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [debouncedSearch, page, sort]);

  useEffect(() => {
    const recentLocalStorage = JSON.parse(
      localStorage.getItem('recent_studies') || '[]'
    );
    const checkRecentStudies = async () => {
      const recentDB = await Promise.all(
        recentLocalStorage.map((i) => getStudyDetail(i.id))
      );
      const filteredDB = recentDB.filter((i) => i?.id);
      const result = filteredDB.map((i) => ({
        ...i,
        reaction: Object.fromEntries(Object.entries(i.reactions).slice(0, 3)),
        days:
          Math.floor(
            (new Date() - new Date(i.createdAt)) / (1000 * 60 * 60 * 24)
          ) + 1,
      }));
      localStorage.setItem('recent_studies', JSON.stringify(result));
      setRecentStudies(result);
    };
    checkRecentStudies();
  }, [location.pathname]);

  const saveRecentStudy = (study) => {
    const prev = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    const filtered = prev.filter((item) => item.id !== study.id);
    const updated = [study, ...filtered].slice(0, 3);

    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    setRecentStudies(updated);
  };

  return (
    <div className={styles.main}>
      <RecentStudiesSection
        recentStudies={recentStudies}
        saveRecentStudy={saveRecentStudy}
      />

      <section className={styles.studiesSection}>
        <p className={styles.title}>스터디 둘러보기</p>
        <div className={styles.filterBar}>
          <div className={styles.searchBar}>
            <img src={searchIc} alt='습관 검색' />
            <input
              value={search}
              className={styles.search}
              type='text'
              placeholder='검색'
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Dropdown
            value={sort}
            onChange={(value) => {
              setSort(value);
              setPage(1);
            }}
          />
        </div>
        <div className={styles.studyContent}>
          {studies.length === 0 && !isLoading ? (
            <div className={styles.emptyStudiesArea}>
              <p className={styles.text}>아직 둘러 볼 스터디가 없어요</p>
            </div>
          ) : studies.length === 0 && isLoading ? (
            <div className={styles.studyCardArea}>
              <div className={styles.studyCardGrid}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <StudyCardSkeleton key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.studyCardArea}>
              <div className={styles.loadingSpace}>
                <div className={styles.studyCardGrid}>
                  {studies.map((study) => (
                    <StudyCard
                      key={study.id}
                      study={study}
                      isDraggingRef={{ current: false }}
                      onSaveRecent={saveRecentStudy}
                    />
                  ))}
                </div>
                {isLoading && (
                  <div className={styles.studyCardGrid}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <StudyCardSkeleton key={index} />
                    ))}
                  </div>
                )}
              </div>
              {hasNextPage && !isLoading && (
                <button
                  className={styles.moreBtn}
                  onClick={() => {
                    setPage((prev) => prev + 1);
                    setIsLoading(true);
                  }}
                >
                  더보기
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
