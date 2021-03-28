import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/pages/home.module.scss';

const myLoader = (): number => {
  return Math.floor(Math.random() * 10);
};

export default function SignUp(): JSX.Element {
  return (
    <>
      <Head>
        <title>PokeTeam | Cadastro</title>
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
            <h1>Cadastro</h1>

            <label htmlFor="name">Nome</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" />

            <label htmlFor="password">Senha</label>
            <input type="password" id="password" />

            <label htmlFor="password_confirmation">Confirmar Senha</label>
            <input type="password" id="password_confirmation" />

            <button type="submit">Cadastrar</button>
          </form>

          <nav className={styles.links}>
            Já possui conta?
            <Link href="/">
              <a>Voltar para login</a>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
