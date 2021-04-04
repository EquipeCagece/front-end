import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface TooltipProps {
  title: string;
  className?: string;
  children: ReactNode;
}

export function Tooltip({
  title,
  className = '',
  children,
}: TooltipProps): JSX.Element {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
      <span>{title}</span>
    </div>
  );
}

export default Tooltip;
