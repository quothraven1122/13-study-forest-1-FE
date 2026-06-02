import styles from './Chip.module.css';

export default function Chip({ text, isDone, onClick }) {
  return (
    <button
      type='button'
      className={`${styles.button} ${isDone ? styles.isDone : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
