import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...rest }: ButtonProps): JSX.Element {
  return (
    <button className={styles.container} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
