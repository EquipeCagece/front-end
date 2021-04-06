import { useState } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { FiSearch, FiX } from 'react-icons/fi';
import { IoArrowForwardCircle, IoArrowBackCircleSharp } from 'react-icons/io5';

import styles from './pokedex.module.scss';

import { Grid } from '../../components/Grid';
import { GridItemPokemon } from '../../components/Grid/GridItemPokemon';
import api from '../../services/api';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: Array<{
    name: string;
  }>;
}

interface PokemonProps {
  pokemonsApi: Pokemon[];
  nextPage: string;
  previousPage: string;
}

interface PokedexProps {
  pokemons: PokemonProps;
}

export default function Pokedex({ pokemons }: PokedexProps): JSX.Element {
  const [pokemonSearch, setPokemonSearch] = useState<Pokemon | void>();
  const [pokemonData, setPokemonData] = useState<PokemonProps>(pokemons);
  const [page, setPage] = useState(1);
  const [pokemonName, setPokemonName] = useState('');

  async function handlePreviousPage(): Promise<void> {
    try {
      const response = await api.get(
        `/pokemon?offset=${(page - 2) * 9}&limit=9`
      );

      setPokemonData({
        pokemonsApi: response.data.pokemons,
        nextPage: response.data.nextPage,
        previousPage: response.data.previousPage,
      });

      setPage(page - 1);
    } catch {
      toast.error('Ocorreu um erro ao trocar de página, tente novamente.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function handleNextPage(): Promise<void> {
    try {
      const response = await api.get(`/pokemon?offset=${page * 9}&limit=9`);

      setPokemonData({
        pokemonsApi: response.data.pokemons,
        nextPage: response.data.nextPage,
        previousPage: response.data.previousPage,
      });
      setPage(page + 1);
    } catch {
      toast.error('Ocorreu um erro ao trocar de página, tente novamente.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function searchPokemonByName(): Promise<void> {
    try {
      const response = await api.get(`/pokemon/search/${pokemonName}`);

      setPokemonSearch(response.data);
    } catch {
      toast.error(
        'Ocorreu um erro na pesquisa, verifique se o nome está correto.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
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
        <ToastContainer />
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
              pokemonData.pokemonsApi.map(pokemon => (
                <Link
                  key={pokemon.id}
                  href={`/pokedex/pokemon/${pokemon.name}`}
                >
                  <a>
                    <GridItemPokemon pokemon={pokemon} />
                  </a>
                </Link>
              ))
            )}
          </Grid>

          {!pokemonSearch && (
            <div className={styles.handlePages}>
              <button
                disabled={pokemonData.previousPage === null}
                onClick={handlePreviousPage}
                type="button"
              >
                <IoArrowBackCircleSharp color="#fff" size={70} />
              </button>
              <button
                disabled={pokemonData.nextPage === null}
                onClick={handleNextPage}
                type="button"
              >
                <IoArrowForwardCircle color="#fff" size={70} />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/pokemon/?offset=0&limit=9');

  return {
    props: {
      pokemons: {
        pokemonsApi: response.data.pokemons,
        nextPage: response.data.nextPage,
        previousPage: response.data.previousPage,
      },
    },
    revalidate: 60 * 60 * 24 * 7, // 1 semana
  };
};
