import styles from './styles.module.scss';

interface GridItemProps {
  imageUrl: string;
  name: string;
}

export function GridItemTeam({ imageUrl, name }: GridItemProps): JSX.Element {
  return (
    <div className={`${styles.container}`}>
      <img src={imageUrl} alt={name} />

      <div>
        <p>{name}</p>
      </div>
    </div>
  );
}
