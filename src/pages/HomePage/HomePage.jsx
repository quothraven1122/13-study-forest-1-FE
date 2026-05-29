import Dropdown from '../../components/Dropdown/Dropdown.jsx';
import Tag from '../../components/Tag/Tag.jsx';
import styles from './HomePage.module.css';

import { useEffect, useRef, useState } from 'react';
import searchIc from '../../assets/icons/ic_search.svg';
import { Link } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce.js';
function StudyCardSkeleton() {
  return (
    <div className={styles.lodingCard}>
      <div className={styles.lodingInfoBox}>
        <div className={styles.lodingTopBox}>
          <div className={styles.skeletonTitleLine}></div>
          <div className={styles.skeletonDaysLine}></div>
        </div>
        {/* 설명글이 들어갈 자리 (중간) */}
        <div className={styles.skeletonDescriptionLine}></div>
      </div>
      {/* 하단 이모지 태그들이 들어갈 자리 (하단) */}
      <div className={styles.skeletonReactionBox}>
        <div className={styles.skeletonTag}></div>
        <div className={styles.skeletonTag}></div>
        <div className={styles.skeletonTag}></div>
      </div>
    </div>
  );
}
function HomePage() {
  ///로딩 스켈레톤 구현
  const [isLoding, setIsLoding] = useState(false);

  /// 마우스 스크롤 함수
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
  /// 스터디 불러오기(검색, 정렬, 페이지네이션)
  const [studies, setStudies] = useState([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('recent');
  const [hasNextPage, setHasNextPage] = useState(true);

  const getStudies = async (
    searchValue = '',
    pageNum = 1,
    sortValue = 'recent'
  ) => {
    const res = await fetch(
      `http://localhost:3000/studies?search=${searchValue}&page=${pageNum}&sort=${sortValue}`
    );
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    async function fetchData() {
      if (page === 1) {
        setStudies([]);
      }
      setIsLoding(true);
      const data = await getStudies(debouncedSearch, page, sort);

      if (page === 1) {
        setStudies(data.data);
      } else {
        setStudies((prev) => [...prev, ...data.data]);
      }
      setIsLoding(false);
      setHasNextPage(data.pagination.hasNextPage);
    }

    fetchData();
  }, [debouncedSearch, page, sort]);
  /// localStorage 스터디
  const RECENT_KEY = 'recent_studies';

  const [recentStudies, setRecentStudies] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    setRecentStudies(data);
  }, []);

  const saveRecentStudy = (study) => {
    const prev = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    const filtered = prev.filter((item) => item.id !== study.id);
    const updated = [study, ...filtered].slice(0, 3);

    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    setRecentStudies(updated);
  };
  /// 스터디 카드 컴포넌트
  function StudyCard({ study }) {
    return (
      <Link
        draggable={false}
        onClick={(e) => {
          if (isDragging.current) {
            e.preventDefault();
            return;
          }
          saveRecentStudy(study);
        }}
        to={`/studies/${study.id}`}
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
                  {study.point === 0 ? (
                    <Tag type='small' point={'0'} status='dark' />
                  ) : (
                    <Tag type='small' point={study.point} status='dark' />
                  )}
                </div>
              </div>
              <p className={styles.daysCount}>{study.days}일째 진행 중</p>
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
          {recentStudies.length === 0 ? (
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
              {recentStudies.map((study) => (
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
          {studies.length === 0 && !isLoding ? (
            //로딩이 끝났는데 진짜 데이터가 0개 일떄
            <div className={styles.emptyStudiesArea}>
              <p className={styles.text}>아직 둘러 볼 스터디가 없어요</p>
            </div>
          ) : studies.length === 0 && isLoding ? (
            //데이터가 로딩 중일 때(첫 진입)
            <div className={styles.studyCardArea}>
              <div className={styles.studyCardGrid}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <StudyCardSkeleton key={index} />
                ))}
              </div>
            </div>
          ) : (
            //실제 데이터 보여줄 때
            <div className={styles.studyCardArea}>
              <div className={styles.lodingSpace}>
                <div className={styles.studyCardGrid}>
                  {studies.map((study) => (
                    <StudyCard key={study.id} study={study} />
                  ))}
                </div>
                {isLoding && (
                  <div className={styles.studyCardGrid}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <StudyCardSkeleton key={index} />
                    ))}
                  </div>
                )}
              </div>
              {hasNextPage && !isLoding && (
                <button
                  className={styles.moreBtn}
                  onClick={() => {
                    setPage((prev) => prev + 1);
                    setIsLoding(true);
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
