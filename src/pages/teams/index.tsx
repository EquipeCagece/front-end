import Head from 'next/head';
import { FiPlusSquare, FiSearch } from 'react-icons/fi';

import styles from './teams.module.scss';

import { Grid } from '../../components/Grid';
import { GridItem } from '../../components/Grid/GridItem';

export default function Teams(): JSX.Element {
  return (
    <>
      <Head>
        <title>Times</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <header>
            <div>
              <div>
                <input type="text" placeholder="Pesquise um pokemon" />
                <button type="button">
                  <FiSearch size={20} color="#e8eaf6" />
                </button>
              </div>

              <button type="button">
                <div className={styles.text}>Criar time</div>
                <div className={styles.icon}>
                  <FiPlusSquare size={20} />
                </div>
              </button>
            </div>
          </header>

          <Grid>
            <GridItem>
              <img src="/images/background_0.jpg" alt="pokemon" />

              <div>
                <p>001</p>
                <p>Time do Pedro</p>
              </div>
            </GridItem>

            <GridItem>
              <img src="/images/background_1.jpg" alt="pokemon" />

              <div>
                <p>002</p>
                <p>Time do Edu</p>
              </div>
            </GridItem>

            <GridItem>
              <img src="/images/background_2.jpg" alt="pokemon" />

              <div>
                <p>003</p>
                <p>Time do Daniel</p>
              </div>
            </GridItem>

            <GridItem>
              <img src="/images/background_3.jpg" alt="pokemon" />

              <div>
                <p>004</p>
                <p>Time do Rodrigo</p>
              </div>
            </GridItem>
          </Grid>
        </div>
      </main>
    </>
  );
}
