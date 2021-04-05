import { FiTrash2 } from 'react-icons/fi';
import styles from './team.module.scss';

export default function Team(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.content}>
          <div className={styles.pokemons}>
            <h1>Time do Pedro</h1>

            <section>
              <h2>Pokemons</h2>
              <div>
                <button type="button">
                  <FiTrash2 size={24} color="#ff6b6b" />
                </button>
                <strong>pikachu</strong>
                <p>
                  <img
                    src="../../types/electric.svg"
                    className="pokemonIcon electric"
                    alt="pikachu"
                  />
                  <img
                    src="../../types/bug.svg"
                    className="pokemonIcon bug"
                    alt="bug"
                  />
                </p>
              </div>
              <div>
                <button type="button">
                  <FiTrash2 />
                </button>
                <h3>charmander</h3>
                <img
                  src="../../types/fire.svg"
                  className="pokemonIcon fire"
                  alt="charizard"
                />
              </div>
              <div>
                <button type="button">
                  <FiTrash2 />
                </button>
                <h3>squirtle</h3>
                <img
                  src="../../types/water.svg"
                  className="pokemonIcon water"
                  alt="squirtle"
                />
              </div>
              <div>
                <button type="button">
                  <FiTrash2 />
                </button>
                <h3>bulbasaur</h3>
                <img
                  src="../../types/grass.svg"
                  className="pokemonIcon grass"
                  alt="bulbasaur"
                />
              </div>
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
