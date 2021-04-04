import Head from 'next/head';
import { FiPlusSquare } from 'react-icons/fi';
import { useState } from 'react';

import styles from './teams.module.scss';

import { Grid } from '../../components/Grid';
import { GridItemTeam } from '../../components/Grid/GridItemTeam';
import { ModalTeam } from '../../components/Modal';

export default function Teams(): JSX.Element {
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
            <GridItemTeam imageUrl="/images/background_0.jpg" name="Pedro" />
            <GridItemTeam imageUrl="/images/background_1.jpg" name="Pedro" />
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
