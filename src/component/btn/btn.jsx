import styles from './btn.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'large',
  shape = 'default',
  width,
  height,
  icon = null,
  disabled = false,
  onClick,
}) {
  const sizeClass = !width ? styles[`size_${size}`] : '';
  const variantClass = styles[`variant_${variant}`];
  const shapeClass = shape !== 'default' ? styles[`shape_${shape}`] : '';

  const buttonClass = [styles.button, sizeClass, variantClass, shapeClass]
    .filter(Boolean)
    .join(' ');

  // 인라인 스타일
  const buttonStyle = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <button
      className={buttonClass}
      style={buttonStyle}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
