import { ReactNodeArray } from 'react';

import styles from './styles.module.scss';

interface GridItemProps {
  children: ReactNodeArray;
}

export function GridItemTeam({ children }: GridItemProps): JSX.Element {
  return <div className={`${styles.container}`}>{children}</div>;
}
