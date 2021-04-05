import Head from 'next/head';
import { FiSearch } from 'react-icons/fi';

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styles from './favorite.module.scss';

import { Grid } from '../../components/Grid';
import { GridItemPokemon } from '../../components/Grid/GridItemPokemonFavorite';
import api from '../../services/api';

interface FavoritesProps {
  pokemons: {
    id: string;
    name: string;
    imageUrl: string;
    types: Array<{
      name: string;
    }>;
    pokemon_id: string;
  }[];
}

export default function Pokedex({ pokemons }: FavoritesProps): JSX.Element {
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
            {pokemons.length !== 0 &&
              pokemons.map(pokemon => (
                <Link href={`/pokemon/${String(pokemon.id)}`}>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await api.get('/favorites', config);

  console.log(response.data);

  return {
    props: {
      pokemons: response.data ?? [],
    },
  };
};
