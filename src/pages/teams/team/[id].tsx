import { GetServerSideProps } from 'next';

import { FiTrash2 } from 'react-icons/fi';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import api from '../../../services/api';
import styles from './team.module.scss';

interface ProfileTeam {
  team: {
    id: string;
    name: string;
    pokemons: Array<{
      id: string;
      name: string;
      type1: string;
      type2: string | null;
    }>;
  };
  typeWeakResist: {
    allWeaknesses: string[];
    allResistence: string[];
  };
}

export default function Team({
  team,
  typeWeakResist,
}: ProfileTeam): JSX.Element {
  const [allweakness, setAllWeakness] = useState<string[]>(() => {
    const setWeakness = new Set<string>();

    typeWeakResist.allWeaknesses.forEach(weakness => {
      setWeakness.add(weakness);
    });

    const weaknessFormatted = [];

    setWeakness.forEach(v => weaknessFormatted.push(v));

    return weaknessFormatted;
  });
  const [allResistence, setAllResistence] = useState<string[]>(() => {
    const setResistence = new Set<string>();

    typeWeakResist.allResistence.forEach(resistence => {
      setResistence.add(resistence);
    });
    const resistenceFormatted = [];

    setResistence.forEach(v => resistenceFormatted.push(v));

    return resistenceFormatted;
  });

  return (
    <>
      <Head>
        <title>PokeTeam | {team.name}</title>
      </Head>
      <div className={styles.container}>
        <ToastContainer />
        <main className={styles.content}>
          <div className={styles.pokemons}>
            <h1>{team.name}</h1>

            <section>
              <h2>Pokemons</h2>

              {team.pokemons?.length !== 0 &&
                team.pokemons?.map(pokemon => (
                  <div key={pokemon.id}>
                    <strong>{pokemon.name}</strong>
                    <p>
                      <img
                        src={`../../types/${pokemon.type1}.svg`}
                        className={`pokemonIcon ${pokemon.type1}`}
                        alt={`${pokemon.name}`}
                      />
                      {pokemon.type2 !== null && (
                        <img
                          src={`../../types/${pokemon.type2}.svg`}
                          className={`pokemonIcon ${pokemon.type2}`}
                          alt={`${pokemon.name}`}
                        />
                      )}
                    </p>
                  </div>
                ))}
            </section>
          </div>

          <div className={styles.stats}>
            <section>
              <h2>Fraqueza</h2>
              <div>
                {allweakness.map(weakness => (
                  <p key={weakness}>
                    <img
                      src={`../../types/${weakness}.svg`}
                      className={`pokemonIcon ${weakness}`}
                      alt={weakness}
                    />
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2>Resistência</h2>
              <div>
                {allResistence.map(resistence => (
                  <p>
                    <img
                      src={`../../types/${resistence}.svg`}
                      className={`pokemonIcon ${resistence}`}
                      alt={resistence}
                    />
                  </p>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { token } = req.cookies;
  const { id } = params;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await api.get(`/teams/team/${id}`, config);

  return {
    props: {
      team: response.data.team ?? [],
      typeWeakResist: response.data.typeWeakResist,
    },
  };
};
