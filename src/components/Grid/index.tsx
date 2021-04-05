import { ReactNodeArray, ReactNode } from 'react';

import styles from './grid.module.scss';

interface GridProps {
  children: ReactNodeArray | ReactNode;
}

export function Grid({ children }: GridProps): JSX.Element {
  return <section className={styles.container}>{children}</section>;
}
