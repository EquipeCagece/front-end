import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/pages/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>PokeTeam | Início</title>
      </Head>
      <div className={styles.container}>
        <img src="/images/logo.png" alt="Logo"/>
        <div>
          <form>
          <h1>Login</h1>

            <label htmlFor="email">E-mail</label>
            <input type="text" id="email"/>

            <label htmlFor="password">Senha</label>
            <input type="password" id="password"/>

            <button type="submit">
              Entrar
            </button>
          </form>

          <nav className={styles.singnUp}>
            Não tem conta?
            <Link href="signip">
              <a>Crie uma imediatamente</a>
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
