import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import styles from '../styles/pages/commonStylesHome.module.scss';

// const myLoader = (): number => {
//   return Math.floor(Math.random() * 10);
// };

export default function SignUp(): JSX.Element {
  const [randomValue, setRandoValue] = useState(0);

  useEffect(() => {
    setRandoValue(Math.floor(Math.random() * 10));
  }, []);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    console.log('submit');
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    // To do
  }

  return (
    <>
      <Head>
        <title>PokeTeam | Cadastro</title>
      </Head>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url("/images/background_${randomValue}.jpg")`,
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

            <input type="text" id="name" placeholder="Nome" />

            <input type="text" id="email" placeholder="E-mail" />

            <input type="password" id="password" placeholder="Senha" />

            <input
              type="password"
              id="password_confirmation"
              placeholder="Confirmar Senha"
            />

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
