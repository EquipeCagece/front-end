import styles from './styles.module.scss';

export function ExperienceBar(): JSX.Element {
  return (
    <div className={styles.experienceBar}>
      <span>0</span>
      <div>
        <div style={{ width: `50%` }} />
      </div>
      <span>256</span>
    </div>
  );
}
