import styles from './Chip.module.css';

export default function Chip({ text }) {
  const name = text;
  const selected = true;
  const className = '';
  const props = {};

  return (
    <button
      className={`${styles.button} ${selected ? styles.isDone : ''} ${className}`}
      {...props}
    >
      {name}
    </button>
  );
}
