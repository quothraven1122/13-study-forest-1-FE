import styles from './Button.module.css';
// import pauseIcon from '../../assets/icon/ic_pause.svg';
// import playIcon from '../../assets/icon/ic_play.svg'
// import restartIcon from '../../assets/icon/ic_restart.svg'
// import stopIcon from '../../assets/icon/ic_stop.svg'

export default function Button({
  children,
  variant = 'Primary', // color
  height = 'All', // height
  shape = 'Default', // 'Default' | 'Round' | 'circle'
  icon = null,
  ...props
}) {
  const shapeClass =
    {
      Round: styles.shapeRound,
      Circle: styles.shapeCircle,
    }[shape] || '';
  const heightClass = styles[`height${height}`];
  const variantClass = styles[`variant${variant}`];

  const buttonClass = [styles.button, shapeClass, heightClass, variantClass]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClass} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
