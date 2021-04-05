import styles from './styles.module.scss';

interface GridItemProps {
  team: {
    team_url: string;
    name: string;
    id: string;
  };
}

export function GridItemTeam({ team }: GridItemProps): JSX.Element {
  return (
    <div className={`${styles.container}`}>
      <img src={team.team_url} alt={team.name} />

      <div>
        <p>{team.name}</p>
      </div>
    </div>
  );
}
