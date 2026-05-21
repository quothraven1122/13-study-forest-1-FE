import styles from './Button.module.css';

export default function Button({
  children,
  shape = 'Default', // 'Default' | 'Round' | 'Circle'
  ...props
}) {
  const shapeClass =
    {
      Round: styles.shapeRound,
      Circle: styles.shapeCircle,
    }[shape] || '';

  return (
    <button className={`${styles.button} ${shapeClass}`} {...props}>
      {children}
    </button>
  );
}
