import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/pages/home.module.scss'

const myLoader = () => {
  return Math.floor(Math.random() * 10)
}

export default function Home() {
  return (
    <>
      <Head>
        <title>PokeTeam | Início</title>
      </Head>
      <div className={styles.container} style={{ backgroundImage: `url("/images/background_${myLoader()}.jpg")` }}>
        <a href="/"><img src="/images/logo.png" alt="Logo" /></a>
        <div>
          <form>
            <h1>Sign Up</h1>

            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" />

            <label htmlFor="password">Senha</label>
            <input type="password" id="password" />

            <label htmlFor="password">Confirmar Senha</label>
            <input type="password" id="password" />

            <button type="submit">
              Sign Up
            </button>
          </form>

        </div>
      </div>
    </>
  )
}
