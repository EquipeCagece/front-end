import styles from './styles.module.scss';

interface GridItemProps {
  team: {
    imageUrl: string;
    name: string;
    id: string;
  }
}

export function GridItemTeam({ team }: GridItemProps): JSX.Element {
  return (
    <div className={`${styles.container}`}>
      <img src={team.imageUrl} alt={team.name} />

      <div>
        <p>{team.name}</p>
      </div>
    </div>
  );
}
