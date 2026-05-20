import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'all',
  shape = 'default', // 'default' | 'round' | 'circle'
  icon = null,
  disabled = false,
  onClick,
  className = '', // circle 추가 클래스용 (restart, pause 등)
}) {
  // Circle은 완전히 다르게 처리
  if (shape === 'circle') {
    const sizeClass = styles[`size_${size}`] || '';
    const variantClass = styles[`variant_${variant}`];
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
  const shapeClass = shape === 'round' ? styles.shape_round : '';
  const sizeClass = styles[`size_${size}`];
  const variantClass = styles[`variant_${variant}`];

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
