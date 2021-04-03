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
            <GridItemTeam>
              <img src="/images/background_0.jpg" alt="pokemon" />

              <div>
                <p>001</p>
                <p>Time do Pedro</p>
              </div>
            </GridItemTeam>

            <GridItemTeam>
              <img src="/images/background_1.jpg" alt="pokemon" />

              <div>
                <p>002</p>
                <p>Time do Edu</p>
              </div>
            </GridItemTeam>

            <GridItemTeam>
              <img src="/images/background_2.jpg" alt="pokemon" />

              <div>
                <p>003</p>
                <p>Time do Daniel</p>
              </div>
            </GridItemTeam>

            <GridItemTeam>
              <img src="/images/background_3.jpg" alt="pokemon" />

              <div>
                <p>004</p>
                <p>Time do Rodrigo</p>
              </div>
            </GridItemTeam>
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
