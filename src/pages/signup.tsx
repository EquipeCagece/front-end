import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import styles from '../styles/pages/commonStylesHome.module.scss';

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

            <Input type="text" id="name" placeholder="Nome" />

            <Input type="text" id="email" placeholder="E-mail" />

            <Input type="password" id="password" placeholder="Senha" />

            <Input
              type="password"
              id="password_confirmation"
              placeholder="Confirmar Senha"
            />

            <Button type="submit">Cadastrar</Button>
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
