import styles from './styles.module.scss';

export function PokemonDetails(): JSX.Element {
  return (
    <section className={styles.container}>
      <strong>Detalhes do Pokemon</strong>

      <div>
        <span>Altura</span>
        <p>0.6m</p>
      </div>

      <div>
        <span>Peso</span>
        <p>8.1kg</p>
      </div>
    </section>
  );
}
