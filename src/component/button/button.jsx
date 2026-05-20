import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'Primary',
  size = 'All',
  shape = 'Default', // 'Default' | 'Round' | 'circle'
  icon = null,
  disabled = false,
  onClick,
  className = '', // circle 추가 클래스용 (restart, pause 등)
}) {
  // Circle은 완전히 다르게 처리
  if (shape === 'circle') {
    const sizeClass = styles[`size${size}`] || '';
    const variantClass = styles[`variant${variant}`];
    const customClass = className ? styles[className] : '';

    const circleClass = [styles.circle, sizeClass, variantClass, customClass]
      .filter(Boolean)
      .join(' ');

    return (
      <button className={circleClass} disabled={disabled} onClick={onClick}>
        {icon && <span className={styles.icon}>{icon}</span>}
      </button>
    );
  }

  // 일반 버튼 + Round
  const shapeClass = shape === 'Round' ? styles.shapeRound : '';
  const sizeClass = styles[`size${size}`];
  const variantClass = styles[`variant${variant}`];

  const buttonClass = [styles.button, shapeClass, sizeClass, variantClass]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
