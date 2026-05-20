import pawPrint from '../../assets/icons/pawprint.png';
import styles from './Sticker.module.css';

export default function Sticker({ className }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <img src={pawPrint} className={styles.img} />
    </div>
  );
}
