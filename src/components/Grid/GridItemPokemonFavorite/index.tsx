/* eslint-disable prettier/prettier */
import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { PokemonTypeColors } from '../../../styles/globals';


import styles from './styles.module.scss';

interface GridItemProps {
  pokemon: {
    types: string[];
    imageUrl: string;
    name: string;
  };
}

export function GridItemPokemon({ pokemon }: GridItemProps): JSX.Element {
  const backgroundColors = pokemon.types.map(type => {
    const types = type.split(', ').map(t => {
      const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
        ([key, _]) => key === t
      );

      return backgroundColor;
    });

    return types;
  });

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: backgroundColors[0][0].medium,
      }}
    >
      <section>
        <div
          style={{
            backgroundColor: backgroundColors[0][0].light,
          }}
        />
        <img
          className={styles.imageContainer}
          src={pokemon.imageUrl}
          alt={pokemon.name}
        />
      </section>

      <div>
        {pokemon.types.map(type =>
          type.split(', ').map((t, index) => {
            const key = index;
            return (
              <img
                key={key}
                className={`${t} pokemonIcon`}
                src={`./types/${t}.svg`}
                alt={t}
              />
            );
          })
        )}

        <p>{pokemon.name}</p>
        <FiHeart size={24}/>
      </div>
    </div>
  );
}
