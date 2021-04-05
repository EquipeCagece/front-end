import { GetStaticProps } from 'next';

import Head from 'next/head';
import { FiSearch, FiX } from 'react-icons/fi';

import Link from 'next/link';
import { useState } from 'react';
import styles from './pokedex.module.scss';

import { Grid } from '../../components/Grid';
import { GridItemPokemon } from '../../components/Grid/GridItemPokemon';
import api from '../../services/api';

interface PokemonProps {
  id: number;
  name: string;
  imageUrl: string;
  types: Array<{
    name: string;
  }>;
}

interface PokedexProps {
  pokemons: PokemonProps[];
}

export default function Pokedex({ pokemons }: PokedexProps): JSX.Element {
  const [pokemonSearch, setPokemonSearch] = useState<PokemonProps | void>();
  const [pokemonData, setPokemonData] = useState<PokemonProps[]>(pokemons);
  const [pokemonName, setPokemonName] = useState('');

  async function searchPokemonByName(): Promise<void> {
    const response = await api.get(`/pokemon/search/${pokemonName}`);

    setPokemonSearch(response.data);
  }

  function handleClearInputName(): void {
    setPokemonName('');

    setPokemonSearch();
  }

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <header>
            <input
              onChange={event => setPokemonName(event.target.value)}
              type="text"
              placeholder="Pesquise um pokemon"
              value={pokemonName}
            />
            {pokemonSearch ? (
              <button
                className={styles.clear}
                onClick={handleClearInputName}
                type="button"
              >
                <FiX size={20} color="#e8eaf6" />
              </button>
            ) : (
              <button onClick={searchPokemonByName} type="button">
                <FiSearch size={20} color="#e8eaf6" />
              </button>
            )}
          </header>

          <Grid>
            {pokemonSearch ? (
              <Link href={`pokedex/pokemon/${pokemonSearch.name}`}>
                <a>
                  <GridItemPokemon pokemon={pokemonSearch} />
                </a>
              </Link>
            ) : (
              pokemonData.map(pokemon => (
                <Link href={`pokedex/pokemon/${pokemon.name}`}>
                  <a>
                    <GridItemPokemon pokemon={pokemon} />
                  </a>
                </Link>
              ))
            )}
          </Grid>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/pokemon/?offset=0&limit=9');

  return {
    props: {
      pokemons: response.data,
    },
  };
};
