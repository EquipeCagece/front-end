import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { BsHeart, BsPlusCircleFill, BsHeartFill } from 'react-icons/bs';

import { PokemonTypeColors } from '../../../styles/globals';
import styles from './pokemon.module.scss';
import { PokemonDetails } from '../../../components/PokemonDetails';
import { PokemonEvolutionCard } from '../../../components/PokemonEvolutionCard';
import { AddToTeamModal } from '../../../components/AddToTeamModal';
import api from '../../../services/api';

interface PokemonProps {
  isFavorited: {
    id: string;
    pokemon_id;
  };
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
  evolutions: {
    pokemonBaseForm: {
      id: number;
      name: string;
      imageUrl: string;
    };
    pokemonFirstEvolution: {
      id: number;
      name: string;
      imageUrl: string;
    };
    pokemonSecondEvolution: {
      id: number;
      name: string;
      imageUrl: string;
    };
  };
}

export default function Pokemon({
  evolutions,
  pokemon,
  isFavorited,
}: PokemonProps): JSX.Element {
  const router = useRouter();
  const [tabPokemon, setTabPokemon] = useState('details');
  const [isPokemonFavorited, setIsPokemonFavorited] = useState(!!isFavorited);
  const [isNewAddPokemonModalOpen, setIsNewTeamModalOpen] = useState(false);

  useEffect(() => {
    setTabPokemon('details');
    setIsPokemonFavorited(!!isFavorited.id);
  }, [isFavorited]);

  const backgroundColors = pokemon.types.map(type => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });

  function handleModalOpen(): void {
    setIsNewTeamModalOpen(true);
  }

  function handleModalClose(): void {
    setIsNewTeamModalOpen(false);
  }

  async function handleFavoritePokemon(): Promise<void> {
    await api.post(`favorites/create`, {
      pokemon_id: pokemon.id,
      name: pokemon.name,
    });

    setIsPokemonFavorited(true);
  }

  async function handleUnFavoritePokemon(): Promise<void> {
    await api.delete(`/favorites/delete/${isFavorited.id}`);

    setIsPokemonFavorited(false);
  }

  return (
    <>
      <Head>
        <title>Pokemon</title>
      </Head>

      <main className={styles.container}>
        <AddToTeamModal
          isOpen={isNewAddPokemonModalOpen}
          onRequestClose={handleModalClose}
          pokemonId={pokemon.id}
        />
        <div className={styles.content}>
          <nav>
            <button onClick={() => router.back()} type="button">
              <FiArrowLeft color="#3d3d3d" size={50} />
            </button>
            <button onClick={handleModalOpen} type="button">
              <BsPlusCircleFill color="#3498db" size={50} />
            </button>
            {isPokemonFavorited ? (
              <button type="button" onClick={handleUnFavoritePokemon}>
                <BsHeartFill color="#ff6b6b" size={50} />
              </button>
            ) : (
              <button type="button" onClick={handleFavoritePokemon}>
                <BsHeart color="#ff6b6b" size={50} />
              </button>
            )}
          </nav>
          <section
            style={{
              backgroundColor: backgroundColors[0].medium,
            }}
          >
            <aside>
              <h1>#{pokemon.id}</h1>
            </aside>
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
            <header>
              <button
                onClick={() => setTabPokemon('details')}
                className={`${tabPokemon === 'details' ? styles.active : ''}`}
                type="button"
              >
                Detalhes
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

            {tabPokemon === 'details' && <PokemonDetails pokemon={pokemon} />}
            {tabPokemon === 'evolutions' && (
              <section className={styles.evolutions}>
                <div>
                  <Link
                    href={`/pokedex/pokemon/${evolutions.pokemonBaseForm.name}`}
                  >
                    <a>
                      <PokemonEvolutionCard
                        key={evolutions.pokemonBaseForm.id}
                        {...evolutions.pokemonBaseForm}
                        background={backgroundColors[0].light}
                      />
                    </a>
                  </Link>
                  <FiArrowRight size={25} />
                </div>
                {evolutions.pokemonFirstEvolution && (
                  <div>
                    <Link
                      href={`/pokedex/pokemon/${evolutions.pokemonFirstEvolution.name}`}
                    >
                      <a>
                        <PokemonEvolutionCard
                          key={evolutions.pokemonFirstEvolution.id}
                          {...evolutions.pokemonFirstEvolution}
                          background={backgroundColors[0].light}
                        />
                      </a>
                    </Link>
                    <FiArrowRight size={25} />
                  </div>
                )}
                {evolutions.pokemonSecondEvolution && (
                  <div>
                    <Link
                      href={`/pokedex/pokemon/${evolutions.pokemonSecondEvolution.name}`}
                    >
                      <a>
                        <PokemonEvolutionCard
                          key={evolutions.pokemonSecondEvolution.id}
                          {...evolutions.pokemonSecondEvolution}
                          background={backgroundColors[0].light}
                        />
                      </a>
                    </Link>
                    <FiArrowRight size={25} />
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { token } = req.cookies;
  const { name } = params;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await api.get(`/pokemon/stats/${name[0]}`, config);
  const responseEvolutinons = await api.get(
    `/pokemon/evolutions/${name[0]}`,
    config
  );

  const { data: pokemonsFavorited } = await api.get('/favorites', config);

  const checkPokemonIsFavorited = pokemonsFavorited.filter(
    pokemon => pokemon.pokemon_id === response.data.id
  );

  return {
    props: {
      pokemon: response.data,
      evolutions: responseEvolutinons.data,
      isFavorited: checkPokemonIsFavorited[0] ?? [],
    },
  };
};
