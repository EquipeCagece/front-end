import styles from './styles.module.scss';

interface PokemonDetailsProps {
  pokemon: {
    id: number;
    name: string;
    imageUrl: string;
    height: number;
    weight: number;
    types: Array<{
      name: string;
    }>;
    stats: Array<{
      baseStatus: number;
      name: string;
    }>;
    abilities: Array<{
      name: string;
    }>;
  };
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps): JSX.Element {
  return (
    <section className={styles.container}>
      <div className={styles.detailsContainer}>
        <h1>{pokemon.name}</h1>
        <div className={styles.typesContainer}>
          {pokemon.types.map(type => (
            <img
              src={`/types/${type.name}.svg`}
              className={`pokemonIcon ${type.name}`}
              alt={pokemon.name}
              key={type.name}
            />
          ))}
        </div>

        <div className={styles.infosContainer}>
          <div>
            <strong>{pokemon.weight}</strong>
            <span>Peso</span>
          </div>

          <div>
            <strong>{pokemon.height}</strong>
            <span>Altura</span>
          </div>
        </div>
      </div>

      <div className={styles.statusContainer}>
        <div className={styles.stats}>
          <h2>Status base</h2>

          {pokemon.stats.map(stat => (
            <div key={stat.name}>
              <p>
                {stat.name} - <span>{stat.baseStatus}</span>
              </p>
            </div>
          ))}
        </div>
        <div className={styles.abilities}>
          <h2>Habilidades</h2>

          {pokemon.abilities.map((ability, index) => {
            const key = index;
            return (
              <p key={key}>
                <span>{index + 1}.</span> {ability.name}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
