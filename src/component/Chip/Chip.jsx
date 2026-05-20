import styles from './Chip.module.css';

export default function Chip({
  name = '미라클 모닝 6시 기상',
  selected = true,
  className = '',
  ...props
}) {
  return (
    <button
      className={`${styles.button} ${selected ? styles.isDone : ''} ${className}`}
      {...props}
    >
      {name}
    </button>
  );
}
