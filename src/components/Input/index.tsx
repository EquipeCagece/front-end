import { InputHTMLAttributes, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Tooltip } from '../Tooltip';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  defaultValue?: string;
}

export function Input({
  error,
  defaultValue,
  ...rest
}: InputProps): JSX.Element {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`${styles.inputContainer} ${
        isFocused ? styles.isFocused : ''
      }`}
    >
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Tooltip title={error}>
          <FiAlertCircle color="c53030" size={20} />
        </Tooltip>
      )}
    </div>
  );
}
