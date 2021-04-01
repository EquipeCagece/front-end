import { ExperienceBar } from '../ExperienceBar';
import styles from './styles.module.scss';

export function PokemonStats(): JSX.Element {
  return (
    <section className={styles.container}>
      <strong>Status base</strong>
      <div>
        <p>HP</p>
        <ExperienceBar />
      </div>

      <div>
        <p>Ataque</p>
        <ExperienceBar />
      </div>

      <div>
        <p>Defesa</p>
        <ExperienceBar />
      </div>

      <div>
        <p>Ataque Especial</p>
        <ExperienceBar />
      </div>

      <div>
        <p>Defesa Especial</p>
        <ExperienceBar />
      </div>

      <div>
        <p>Velocidade</p>
        <ExperienceBar />
      </div>
    </section>
  );
}
