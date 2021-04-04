import { PokemonTypeColors } from '../../../styles/globals';

import styles from './styles.module.scss';

interface GridItemProps {
  pokemon: {
    id: number;
    name: string;
    imageUrl: string;
    types: Array<{
      name: string;
    }>;
  };
}

export function GridItemPokemon({ pokemon }: GridItemProps): JSX.Element {
  const backgroundColors = pokemon.types.map(type => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: backgroundColors[0].medium,
      }}
    >
      <section>
        <div
          style={{
            backgroundColor: backgroundColors[0].light,
          }}
        />
        <img
          className={styles.imageContainer}
          src={pokemon.imageUrl}
          alt={pokemon.name}
        />
      </section>

      <div>
        {pokemon.types.map(type => (
          <img
            key={type.name}
            className={`${type.name} pokemonIcon`}
            src={`./types/${type.name}.svg`}
            alt={type.name}
          />
        ))}

        <p>{pokemon.name}</p>
      </div>
    </div>
  );
}
