import styles from './Button.module.css';

export default function Button({
  children,
  shape = 'Default', // 'Default' | 'Round' | 'Circle'
  className,
  ...props
}) {
  const shapeClass =
    {
      Round: styles.shapeRound,
      Circle: styles.shapeCircle,
    }[shape] || '';

  return (
    <button
      className={`${styles.button} ${shapeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
