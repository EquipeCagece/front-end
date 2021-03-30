import Head from 'next/head';
import { FiSearch } from 'react-icons/fi';
import { SideBar } from '../../components/Sidebar';

import styles from '../../styles/pages/pokedex.module.scss';

export default function Pokedex(): JSX.Element {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main className={styles.container}>
        <SideBar />
        <div className={styles.content}>
          <header>
            <input type="text" placeholder="Pesquise um pokemon" />
            <button type="button">
              <FiSearch size={20} color="#e8eaf6" />
            </button>
          </header>

          <section>
            <div className={styles.card}>
              <img
                src="https://i.pinimg.com/originals/9a/7b/a2/9a7ba23f62d913cc4e0c8e590b50995c.png"
                alt="pokemon"
              />

              <div>
                <p>001</p>
                <p>Pikachu</p>
              </div>
            </div>

            <div className={styles.card}>
              <img
                src="https://i.pinimg.com/originals/3d/f2/db/3df2dbe82ab0a446ef57bada79b5b277.png"
                alt="pokemon2"
              />

              <div>
                <p>002</p>
                <p>Bulbasaur</p>
              </div>
            </div>

            <div className={styles.card}>
              <img
                src="https://cdn.ome.lt/P6baw5tdceBOHZXqnqarpF-3buA=/1200x630/smart/extras/conteudos/squirtle.jpeg"
                alt="pokemon3"
              />

              <div>
                <p>003</p>
                <p>Squirtle</p>
              </div>
            </div>

            <div className={styles.card}>
              <img
                src="https://kanto.legiaodosherois.com.br/w760-h398-gnw-cfill-q80/wp-content/uploads/2020/05/legiao_Ivj8qSxFEQif.jpg.jpeg"
                alt="pokemon5"
              />

              <div>
                <p>005</p>
                <p>Charizard</p>
              </div>
            </div>

            <div className={styles.card}>
              <img
                src="https://i.pinimg.com/originals/7a/f6/0b/7af60b2b6fa202db54f0aa275fee6e17.png"
                alt="pokemon4"
              />

              <div>
                <p>004</p>
                <p>Charmander</p>
              </div>
            </div>

            <div className={styles.card}>
              <img
                src="https://d2skuhm0vrry40.cloudfront.net/2017/articles/2017-09-21-12-26/mewtwo.png/EG11/resize/480x-1/quality/75/format/jpg"
                alt="pokemon6"
              />

              <div>
                <p>007</p>
                <p>Mewtwo</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
