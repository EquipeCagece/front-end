/* eslint-disable prettier/prettier */
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
                <h3>pikachu</h3>
                <img
                  src="../../types/electric.svg"
                  className="pokemonIcon electric"
                  alt="pikachu"
                />
              </div>
              <div>
                <h3>charmander</h3>
                <img
                  src="../../types/fire.svg"
                  className="pokemonIcon fire"
                  alt="charizard"
                />
              </div>
              <div>
                <h3>squirtle</h3>
                <img
                  src="../../types/water.svg"
                  className="pokemonIcon water"
                  alt="squirtle"
                />
              </div>
              <div>
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
