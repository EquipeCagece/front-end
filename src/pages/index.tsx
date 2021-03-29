import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/pages/home.module.scss';

const myLoader = (): number => {
  return Math.floor(Math.random() * 10);
};

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>PokeTeam | Login</title>
      </Head>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url("/images/background_${myLoader()}.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="Logo" />
          </a>
        </Link>
        <div>
          <form>
            <h1>Login</h1>

            <input type="text" id="email" placeholder="E-mail" />

            <input type="password" id="password" placeholder="Senha" />

            <button type="submit">Entrar</button>
          </form>

          <nav className={styles.links}>
            Não tem conta?
            <Link href="/signup">
              <a>Criar conta</a>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
