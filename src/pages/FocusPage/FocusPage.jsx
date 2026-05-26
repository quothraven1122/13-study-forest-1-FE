import { useState } from 'react';
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
  const userName = '연우'; // 일단은...
  const [totalEarnedPoints, setTotalEarnedPoints] = useState(310);

  const navigate = useNavigate();
  const { studyId } = useParams();

  // 'idle' (아무일도 없는 상태 게으른..)
  // 'running' (진행중)
  // 'paused' (일시정지)
  // 'overtime' (시간초과)
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState(null);

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
    setToast(null);
  };

  const handleStop = () => {
    showToast('3포인트를 획득했습니다!', 'success');
    setStatus('idle');
  };

  // ── 스타일 및 UI 분기 변수 ────────────────────────────────────
  const isActive = status !== 'idle';
  const timerColorClass =
    status === 'paused'
      ? styles.timerRed
      : status === 'overtime'
        ? styles.timerGreen
        : '';

  // 퍼블리싱 확인용 고정 시간 텍스트
  const displayTime = status === 'overtime' ? '00:12' : '25:00';

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
                25:00
              </span>
            )}
          </div>

          {/* 타이머 숫자 */}
          <div
            className={`${styles.timer} ${timerColorClass} ${isActive ? styles.timerBoxActive : ''}`}
          >
            {displayTime}
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
