import Head from 'next/head';
import { FiSearch } from 'react-icons/fi';

import styles from '../../styles/pages/commonStylesGrid.module.scss';

export default function Teams(): JSX.Element {
  return (
    <>
      <Head>
        <title>Times</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <header>
            <input type="text" placeholder="Pesquise um pokemon" />
            <button type="button">
              <FiSearch size={20} color="#e8eaf6" />
            </button>
          </header>

          <section>
            <div className={styles.card}>
              <img src="/images/background_0.jpg" alt="pokemon" />

              <div>
                <p>001</p>
                <p>Time do Pedro</p>
              </div>
            </div>

            <div className={styles.card}>
              <img src="/images/background_1.jpg" alt="pokemon" />

              <div>
                <p>002</p>
                <p>Time do Edu</p>
              </div>
            </div>

            <div className={styles.card}>
              <img src="/images/background_2.jpg" alt="pokemon" />

              <div>
                <p>003</p>
                <p>Time do Daniel</p>
              </div>
            </div>

            <div className={styles.card}>
              <img src="/images/background_3.jpg" alt="pokemon" />

              <div>
                <p>004</p>
                <p>Time do Rodrigo</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
