import { GetServerSideProps } from 'next';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
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

  }
}

export default function Team({ team }: ProfileTeam) : JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.content}>
          <div className={styles.pokemons}>
            <h1>{ team.name }</h1>

            <section>
              <h2>Pokemons</h2>
              
              {team.pokemons.length !== 0 &&
              team.pokemons.map(pokemon => (
                <div>
                  <button type="button">
                    <FiTrash2 size={24} color="#ff6b6b" />
                  </button>
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
              <div />
            </section>

            <section>
              <h2>Resistência</h2>
              <div />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { token } = req.cookies;
  const { id } = params;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await api.get(`/teams/team/${id}`, config);

  return {
    props: {
      team: response.data ?? [],
    },
  };
};