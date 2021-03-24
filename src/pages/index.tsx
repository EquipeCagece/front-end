import Head from 'next/head'
import { useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

import styles from '../styles/pages/home.module.scss'

export default function Home() {
  const [toggledButton, setToggledButton] = useState(false)

  return (
    <>
      <Head>
        <title>PokeTeam | Início</title>
      </Head>
      <div className={styles.container}>
        <div />
        

        <div>
          <button
            onClick={() => setToggledButton(!toggledButton)}
            className={toggledButton ? styles.active : ''}
          >
            <FiArrowLeft size={25} />
          </button>
          <AnimatePresence initial={false}>
            {toggledButton && (
              <motion.form
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { x: 0 },
                  closed: { x: "100%" } 
                }}
                transition={{ duration: 0.5 }}
              >
              <h1>Login</h1>

              <label htmlFor="email">E-mail</label>
              <input type="text" id="email"/>

              <label htmlFor="password">Senha</label>
              <input type="password" id="password"/>

              <button type="submit">
                Entrar
              </button>
            </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
