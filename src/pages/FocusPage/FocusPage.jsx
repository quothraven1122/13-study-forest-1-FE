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
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [mStr, setMStr] = useState('25');
  const [sStr, setSStr] = useState('00');
  const [userName, setUserName] = useState('');
  const [totalEarnedPoints, setTotalEarnedPoints] = useState(0);
  const { studyId } = useParams();
  useEffect(() => {
    const fetchStudyDetail = async () => {
      const response = await fetch(
        `http://localhost:3000/studies/${studyId}/focus`
      );
      const data = await response.json();
      console.log(data);
      setUserName(data.nickname);
      setTotalEarnedPoints(data.point); // 초기 포인트
    };
    fetchStudyDetail();
  }, [studyId]);

  const navigate = useNavigate();
  const totalSeconds =
    (Number(timerMinutes) || 0) * 60 + (Number(timerSeconds) || 0) || 60;
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

  // ── 토스트 제어 핸들러 ───────────────────────────────────────
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  // ── UI 인터랙션 핸들러 ───────────────────────────────────────
  const handleStart = () => {
    const m = Number(timerMinutes) || 0;
    const s = Number(timerSeconds) || 0;
    const total = m * 60 + s || 60;
    setTimerMinutes(m);
    setTimerSeconds(s);
    setMStr(String(m).padStart(2, '0'));
    setSStr(String(s).padStart(2, '0'));
    setRemaining(total);
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

  const clampTotal = (m, s) => {
    if (m * 60 + s > 3600) {
      setTimerMinutes(60);
      setTimerSeconds(0);
      setMStr('60');
      setSStr('00');
    } else if (m * 60 + s <= 300) {
      setTimerMinutes(5);
      setTimerSeconds(0);
      setMStr('05');
      setSStr('00');
    } else {
      setMStr(String(m).padStart(2, '0'));
      setSStr(String(s).padStart(2, '0'));
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setRemaining(totalSeconds); // 처음에 셋팅한 총 s로 돌아감
    setOvertime(0);
    setToast(null);
    setMStr(String(timerMinutes).padStart(2, '0'));
    setSStr(String(timerSeconds).padStart(2, '0'));
  };

  const handleStop = async () => {
    clearInterval(intervalRef.current);
    setLoading(true);
    const points = 3 + Math.floor(overtime / 600); // 600초 === 10분
    try {
      const response = await fetch(
        `http://localhost:3000/studies/${studyId}/focus`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ points }),
        }
      );
      if (!response.ok) throw new Error('서버 오류');
      const data = await response.json();
      setTotalEarnedPoints(data.point);
      showToast(`${points}포인트를 획득했습니다!`, 'success');
    } catch (error) {
      showToast(`${points}포인트 획득에 실패하셨습니다!`, 'error');
    } finally {
      setStatus('idle');
      setRemaining(totalSeconds);
      setLoading(false);
      setOvertime(0);
    }
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
    status === 'paused' || (status === 'running' && remaining <= 10)
      ? styles.timerRed
      : status === 'overtime'
        ? styles.timerTimeover
        : '';
  const displayTime =
    status === 'overtime' ? `-${format(overtime)}` : format(remaining);

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
              <div className={styles.timerInputGroup}>
                <input
                  type='text'
                  inputMode='numeric'
                  value={mStr}
                  className={styles.timerInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '').slice(-2);
                    setMStr(raw);
                    setTimerMinutes(Number(raw) || 0);
                  }}
                  onBlur={() => clampTotal(timerMinutes, timerSeconds)}
                />
                <span className={styles.timerColon}>:</span>
                <input
                  type='text'
                  inputMode='numeric'
                  value={sStr}
                  className={styles.timerInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '').slice(-2);
                    const val = Math.min(59, Number(raw) || 0);
                    setSStr(String(val));
                    setTimerSeconds(val);
                  }}
                  onBlur={() => clampTotal(timerMinutes, timerSeconds)}
                />
              </div>
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
                  style={{ backgroundColor: '#99C08E' }}
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
