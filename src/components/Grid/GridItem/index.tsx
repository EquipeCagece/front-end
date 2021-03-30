import { ReactNodeArray } from 'react';

import styles from './gridItem.module.scss';

interface GridItemProps {
  children: ReactNodeArray;
}

export function GridItem({ children }: GridItemProps): JSX.Element {
  return <div className={`${styles.container}`}>{children}</div>;
}
