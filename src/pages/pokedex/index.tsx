import Head from 'next/head';
import { FiSearch } from 'react-icons/fi';

import styles from './pokedex.module.scss';

import { Grid } from '../../components/Grid';
import { GridItem } from '../../components/Grid/GridItem';

export default function Pokedex(): JSX.Element {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <header>
            <input type="text" placeholder="Pesquise um pokemon" />
            <button type="button">
              <FiSearch size={20} color="#e8eaf6" />
            </button>
          </header>

          <Grid>
            <GridItem>
              <img
                src="https://i.pinimg.com/originals/9a/7b/a2/9a7ba23f62d913cc4e0c8e590b50995c.png"
                alt="pokemon"
              />

              <div>
                <img
                  className="electric pokemonIcon"
                  src="../../../types/electric.svg"
                  alt="electric"
                />
                <p>Pikachu</p>
              </div>
            </GridItem>

            <GridItem>
              <img
                src="https://i.pinimg.com/originals/3d/f2/db/3df2dbe82ab0a446ef57bada79b5b277.png"
                alt="pokemon2"
              />

              <div>
                <img
                  className="grass pokemonIcon"
                  src="../../../types/grass.svg"
                  alt="grass"
                />
                <img
                  className="poison pokemonIcon"
                  src="../../../types/poison.svg"
                  alt="poison"
                />
                <p>Bulbasaur</p>
              </div>
            </GridItem>

            <GridItem>
              <img
                src="https://cdn.ome.lt/P6baw5tdceBOHZXqnqarpF-3buA=/1200x630/smart/extras/conteudos/squirtle.jpeg"
                alt="pokemon3"
              />

              <div>
                <img
                  className="water pokemonIcon"
                  src="../../../types/water.svg"
                  alt="water"
                />
                <p>Squirtle</p>
              </div>
            </GridItem>

            <GridItem>
              <img
                src="https://kanto.legiaodosherois.com.br/w760-h398-gnw-cfill-q80/wp-content/uploads/2020/05/legiao_Ivj8qSxFEQif.jpg.jpeg"
                alt="pokemon5"
              />

              <div>
                <img
                  className="fire pokemonIcon"
                  src="../../../types/fire.svg"
                  alt="fire"
                />

                <img
                  className="flying pokemonIcon"
                  src="../../../types/flying.svg"
                  alt="flying"
                />
                <p>Charizard</p>
              </div>
            </GridItem>

            <GridItem>
              <img
                src="https://i.pinimg.com/originals/7a/f6/0b/7af60b2b6fa202db54f0aa275fee6e17.png"
                alt="pokemon4"
              />

              <div>
                <img
                  className="fire pokemonIcon"
                  src="../../../types/fire.svg"
                  alt="fire"
                />
                <p>Charmander</p>
              </div>
            </GridItem>

            <GridItem>
              <img
                src="https://d2skuhm0vrry40.cloudfront.net/2017/articles/2017-09-21-12-26/mewtwo.png/EG11/resize/480x-1/quality/75/format/jpg"
                alt="pokemon6"
              />

              <div>
                <img
                  className="psychic pokemonIcon"
                  src="../../../types/psychic.svg"
                  alt="psychic"
                />
                <p>Mewtwo</p>
              </div>
            </GridItem>
          </Grid>
        </div>
      </main>
    </>
  );
}
