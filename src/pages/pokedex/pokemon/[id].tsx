import Head from 'next/head';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { PokemonTypeColors } from '../../../styles/globals';
import styles from './pokemon.module.scss';
import { PokemonDetails } from '../../../components/PokemonDetails';
import { PokemonStats } from '../../../components/PokemonStats';
import { PokemonEvolutionCard } from '../../../components/PokemonEvolutionCard';

export default function Pokemon(): JSX.Element {
  const [tabPokemon, setTabPokemon] = useState('details');

  const pokemon = {
    types: ['electric'],
    imageUrl:
      'https://i.pinimg.com/originals/9a/7b/a2/9a7ba23f62d913cc4e0c8e590b50995c.png',
    name: 'pikachu',
  };

  const pokemonEvolutions = [
    {
      id: 1,
      imageUrl: 'https://cdn.bulbagarden.net/upload/b/b9/172Pichu.png',
      name: 'pichu',
    },
    {
      id: 2,
      imageUrl:
        'https://i.pinimg.com/originals/9a/7b/a2/9a7ba23f62d913cc4e0c8e590b50995c.png',
      name: 'pikachu',
    },
    {
      id: 3,
      imageUrl: 'https://cdn.bulbagarden.net/upload/8/88/026Raichu.png',
      name: 'raichu',
    },
  ];

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
    <>
      <Head>
        <title>Pokemon</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <section
            style={{
              backgroundColor: backgroundColors[0][0].medium,
            }}
          >
            <aside>
              <span>#001</span>
              <h2>Pikachu</h2>
            </aside>
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
            <header>
              <button
                onClick={() => setTabPokemon('details')}
                className={`${tabPokemon === 'details' ? styles.active : ''}`}
                type="button"
              >
                Detalhes
              </button>
              <button
                className={`${tabPokemon === 'status' ? styles.active : ''}`}
                onClick={() => setTabPokemon('status')}
                type="button"
              >
                Status
              </button>
              <button
                className={`${
                  tabPokemon === 'evolutions' ? styles.active : ''
                }`}
                onClick={() => setTabPokemon('evolutions')}
                type="button"
              >
                Evoluções
              </button>
            </header>

            {tabPokemon === 'status' && <PokemonStats />}
            {tabPokemon === 'details' && <PokemonDetails />}
            {tabPokemon === 'evolutions' && (
              <section className={styles.evolutions}>
                {pokemonEvolutions.map(evolution => (
                  <>
                    <PokemonEvolutionCard
                      key={evolution.id}
                      {...evolution}
                      background={backgroundColors[0][0].light}
                    />
                    <FiArrowRight size={25} />
                  </>
                ))}
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
