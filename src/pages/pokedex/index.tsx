/* eslint-disable prettier/prettier */
import Head from 'next/head';
import { FiSearch } from 'react-icons/fi';

import Link from 'next/link';
import styles from './pokedex.module.scss';

import { Grid } from '../../components/Grid';
import { GridItemPokemon } from '../../components/Grid/GridItemPokemon';

export default function Pokedex(): JSX.Element {
  const data = {
    pokemon1: {
      types: ['electric'],
      imageUrl:
        'https://i.pinimg.com/originals/9a/7b/a2/9a7ba23f62d913cc4e0c8e590b50995c.png',
      name: 'pikachu',
    },

    pokemon2: {
      types: ['grass'],
      imageUrl: 'https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png',
      name: 'bulbasaur',
    },

    pokemon3: {
      types: ['water'],
      imageUrl:
        'https://www.nicepng.com/png/full/30-301637_chibi-by-myooomy-on-deviantart-cool-squirtle-transparent.png',
      name: 'squirtle',
    },

    pokemon4: {
      types: ['fire, flying'],
      imageUrl:
        'https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/1200px-006Charizard.png',
      name: 'charizard',
    },
  };

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
            <Link href="/pokedex/pokemon/1">
              <a>
                <GridItemPokemon pokemon={data.pokemon1} />
              </a>
            </Link>

            <GridItemPokemon pokemon={data.pokemon2} />

            <GridItemPokemon pokemon={data.pokemon3} />

            <GridItemPokemon pokemon={data.pokemon4} />
          </Grid>
        </div>
      </main>
    </>
  );
}
