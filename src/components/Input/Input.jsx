import { useState } from 'react';
import styles from './Input.module.css';
import eyeOpenIcon from '../../assets/cards/btn_visibility_on_24px-1.svg';
import eyeCloseIcon from '../../assets/cards/btn_visibility_on_24px.svg';

export default function Input({
  maxLength = 300,
  textarea = false,
  passwordToggle = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.wrapper}>
      {textarea ? (
        <textarea
          {...props}
          className={styles.input}
          style={{ minHeight: '98px' }}
          maxLength={maxLength}
        />
      ) : (
        <div className={styles.inputWrapper}>
          <input
            {...props}
            className={styles.input}
            style={{ height: '48px' }}
            maxLength={maxLength}
            type={passwordToggle ? (showPassword ? 'text' : 'password') : null}
          />
          {passwordToggle && (
            <button
              type='button'
              className={styles.pwiconBtn}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                src={!showPassword ? eyeOpenIcon : eyeCloseIcon}
                alt='비밀번호 토글'
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
