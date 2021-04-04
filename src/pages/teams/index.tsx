import { GetServerSideProps } from 'next'

import Head from 'next/head';
import { FiPlusSquare } from 'react-icons/fi';
import React, { useState } from 'react';

import styles from './teams.module.scss';

import { Grid } from '../../components/Grid';
import { GridItemTeam } from '../../components/Grid/GridItemTeam';
import { ModalTeam } from '../../components/Modal';
import api from '../../services/api';
import Link from 'next/link';

interface TeamsProps {
  teams: {
    id: string;
    name: string;
    imageUrl: string;
  }[]
}

export default function Teams({ teams }: TeamsProps): JSX.Element {
  const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false);

  function handleModalOpen(): void {
    setIsNewTeamModalOpen(true);
  }

  function handleModalClose(): void {
    setIsNewTeamModalOpen(false);
  }

  return (
    <>
      <Head>
        <title>Times</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <header>
            <div>
              <button type="button" onClick={handleModalOpen}>
                <div className={styles.text}>Criar time</div>
                <div className={styles.icon}>
                  <FiPlusSquare size={20} />
                </div>
              </button>
            </div>
          </header>

          <Grid>
            { teams.length !== 0 && teams.map(team => (
              <Link href={`/team/${team.id}`}>
                <a>
                  <GridItemTeam team={team} />
                </a> 
              </Link>
            ))}
          </Grid>
        </div>
        <ModalTeam
          isOpen={isNewTeamModalOpen}
          onRequestClose={handleModalClose}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get('/teams/');

  return {
    props: {
      teams: response.data ?? [],
    },
  };
};
