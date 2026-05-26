import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './FocusPage.module.css';
import Button from '../../components/Button/Button.jsx';
import Toast from '../../components/Toast/Toast.jsx';
import Tag from '../../components/Tag/Tag.jsx';
import ArrowRight from '../../assets/icons/ic_arrow_right.svg';
import PlayIcon from '../../assets/icons/ic_play.svg';
import StopIcon from '../../assets/icons/ic_stop.svg';
import TimerIcon from '../../assets/icons/ic_timer.svg';
import RestartIcon from '../../assets/icons/ic_restart.svg';
import PauseIcon from '../../assets/icons/ic_pause.svg';

export default function FocusPage() {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [userName, setUserName] = useState('');
  const [totalEarnedPoints, setTotalEarnedPoints] = useState(0);
  const { studyId } = useParams();
  useEffect(() => {
    const fetchStudyDetail = async () => {
      const response = await fetch(
        // `http://localhost:3000/studies/${studyId}/focus`
        `http://localhost:3000/studies/143/focus`
      );
      const data = await response.json();
      console.log(data);
      setUserName(data.name);
      // setTimerMinutes(data.timerMinutes);
      setTotalEarnedPoints(data.point); // 초기 포인트
    };
    fetchStudyDetail();
  }, [studyId]);

  const navigate = useNavigate();
  const totalSeconds = timerMinutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [overtime, setOvertime] = useState(0);
  const [loading, setLoading] = useState(false);

  // 'idle' (아무일도 없는 상태 게으른..)
  // 'running' (진행중)
  // 'paused' (일시정지)
  // 'overtime' (시간초과)
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState(null); // { id, message, type }
  const intervalRef = useRef(null);
  useEffect(() => {
    if (status !== 'running' && status !== 'overtime') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (status === 'running') {
        setRemaining((prev) => {
          if (prev <= 1) {
            setStatus('overtime');
            return 0;
          }
          return prev - 1;
        });
      } else if (status === 'overtime') {
        setOvertime((prev) => prev + 1);
      }
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  const calcPoints = (minutes) => 3 + Math.floor(minutes / 10);

  // ── 토스트 제어 핸들러 ───────────────────────────────────────
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  // ── UI 인터랙션 핸들러 ───────────────────────────────────────
  const handleStart = () => {
    setStatus('running');
    setToast(null);
  };

  const handlePause = () => {
    setStatus('paused');
    showToast('집중이 중단되었습니다.', 'error');
  };

  const handleResume = () => {
    setStatus('running');
    setToast(null);
  };

  const handleReset = () => {
    setStatus('idle');
    setRemaining(totalSeconds); // 처음에 셋팅한 총 s로 돌아감
    setOvertime(0);
    setToast(null);
  };

  const handleStop = async () => {
    clearInterval(intervalRef.current);
    setLoading(true);
    const points = calcPoints(timerMinutes);

    // const response = await fetch(
    //   `http://localhost:3000/studies/${studyId}/focus/point`,
    //   {
    //     method: 'PATCH',
    //     body: JSON.stringify({ points }),
    //   }
    // );
    const response = await fetch(`http://localhost:3000/studies/143/focus`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points }),
    });
    const data = await response.json();
    setTotalEarnedPoints(data.point); // points point??? 네이밍 좀 이상한데
    // try catch 문 필요

    showToast(`${points}포인트를 획득했습니다!`, 'success');
    setLoading(false);
    setStatus('idle');
    setRemaining(totalSeconds);
    setOvertime(0);
  };

  const format = (secs) => {
    const abs = Math.abs(secs);
    const m = String(Math.floor(abs / 60)).padStart(2, '0');
    const s = String(abs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  // ── 스타일 및 UI 분기 변수 ────────────────────────────────────
  const isActive = status !== 'idle';
  const timerColorClass =
    status === 'paused'
      ? styles.timerRed
      : status === 'overtime'
        ? styles.timerGreen
        : '';
  const displayTime =
    status === 'overtime' ? `${format(overtime)}` : format(remaining);

  return (
    <>
      <div className={styles.focusPageContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{userName}의 개발공장</h1>
          <div className={styles.navButtons}>
            <Button
              className={styles.navButton}
              onClick={() => navigate(`/studies/${studyId}/habits`)}
            >
              오늘의 습관
              <img src={ArrowRight} alt='arrowRight' />
            </Button>
            <Button className={styles.navButton} onClick={() => navigate('/')}>
              홈
              <img src={ArrowRight} alt='arrowRight' />
            </Button>
          </div>
        </div>

        {/* 포인트 */}
        <p className={styles.pointsLabel}>현재까지 획득한 포인트</p>
        <Tag point={totalEarnedPoints} status='light' />

        {/* 타이머 */}
        <div className={styles.timerContainer}>
          <div className={styles.timerHeader}>
            <span className={styles.timerTitle}>오늘의 집중</span>
            {isActive && (
              <span className={styles.timerSetting}>
                <img src={TimerIcon} alt='timer' />
                {format(totalSeconds)}
              </span>
            )}
          </div>

          {/* 타이머 숫자 */}
          <div
            className={`${styles.timer} ${timerColorClass} ${isActive ? styles.timerBoxActive : ''}`}
          >
            {status === 'idle' ? (
              <input
                type='number'
                min='1'
                max='60'
                value={timerMinutes}
                className={styles.timer}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  textAlign: 'center',
                  background: 'transparent',
                }}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTimerMinutes(val);
                  setRemaining(val * 60);
                }}
              />
            ) : (
              displayTime
            )}
          </div>

          {/* 하단 제어 버튼 영역 */}
          <div className={styles.controls}>
            {status === 'idle' && (
              <Button
                shape='Round'
                onClick={handleStart}
                className={styles.buttonStart}
              >
                <img src={PlayIcon} alt='play' />
                Start!
              </Button>
            )}

            {(status === 'running' || status === 'paused') && (
              <div className={styles.controlGroup}>
                <Button
                  className={styles.circleBtn}
                  onClick={handlePause}
                  disabled={status === 'paused'}
                  aria-label='일시정지'
                >
                  <img src={PauseIcon} alt='pause' />
                </Button>
                <Button
                  shape='Round'
                  onClick={status === 'running' ? handlePause : handleResume}
                  disabled={status === 'running'}
                  className={styles.buttonStart}
                >
                  <img src={PlayIcon} alt='play' />
                  Start!
                </Button>
                <Button
                  className={styles.circleBtn}
                  onClick={handleReset}
                  aria-label='리셋'
                >
                  <img src={RestartIcon} alt='restart' />
                </Button>
              </div>
            )}

            {status === 'overtime' && (
              <Button
                shape='Round'
                className={styles.buttonStop}
                onClick={handleStop}
                disabled={loading}
              >
                <img src={StopIcon} alt='stop' />
                Stop!
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div className={styles.toastWrapper}>
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </>
  );
}
