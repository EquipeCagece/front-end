import { GetStaticProps } from 'next';

import Head from 'next/head';
import { FiSearch } from 'react-icons/fi';

import Link from 'next/link';
import styles from './pokedex.module.scss';

import { Grid } from '../../components/Grid';
import { GridItemPokemon } from '../../components/Grid/GridItemPokemon';
import api from '../../services/api';

interface PokedexProps {
  pokemons: {
    id: number;
    name: string;
    imageUrl: string;
    types: Array<{
      name: string;
    }>;
  }[];
}

export default function Pokedex({ pokemons }: PokedexProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <header>
            <input type="text" placeholder="Pesquise um pokemon" />
            <button type="button">
              <FiSearch size={20} color="#e8eaf6" />
            </button>
          </header>

          <Grid>
            {pokemons.map(pokemon => (
              <Link href={`/pokedex/pokemon/${String(pokemon.id)}`}>
                <a>
                  <GridItemPokemon pokemon={pokemon} />
                </a>
              </Link>
            ))}
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
