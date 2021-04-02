/* eslint-disable prettier/prettier */
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

import styles from '../styles/pages/commonStylesHome.module.scss';

export default function Home(): JSX.Element {
  const auth = useAuth();

  const [randomValue, setRandoValue] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setRandoValue(Math.floor(Math.random() * 10));
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    console.log('submit');
    auth.signIn({
      email: formData.email,
      password: formData.password,
    });
  }

  return (
    <>
      <Head>
        <title>PokeTeam | Login</title>
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
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <input
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={handleInputChange}
            />

            <input
              type="password"
              placeholder="Senha"
              name="password"
              onChange={handleInputChange}
            />

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
