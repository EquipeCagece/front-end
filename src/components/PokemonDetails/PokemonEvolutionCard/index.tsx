import styles from './styles.module.scss';

interface PokemonEvolutionCardProps {
  imageUrl: string;
  id: number;
  name: string;
  background: string;
}

export function PokemonEvolutionCard({
  id,
  imageUrl,
  name,
  background,
}: PokemonEvolutionCardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div
        style={{
          backgroundColor: background,
        }}
      >
        <img src={imageUrl} alt={name} />
      </div>
      <span>{id}</span>
      <p>{name}</p>
    </div>
  );
}
