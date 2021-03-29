import Head from 'next/head';
import { FiCamera } from 'react-icons/fi';
import styles from '../styles/pages/profile.module.scss';
import { SideBar } from '../components/Sidebar';

export default function Profile(): JSX.Element {
  function handleSubmit(): void {
    console.log('submit');
  }

  return (
    <>
      <Head>
        <title>Pokedex | Perfil</title>
      </Head>
      <main className={styles.container}>
        <SideBar />

        <div>
          <form onSubmit={handleSubmit}>
            <div className={styles.avatarInput}>
              <img src="/images/background_0.jpg" alt="Avatar" />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" />
              </label>
            </div>

            <input type="text" placeholder="Nome" />

            <input type="text" placeholder="E-mail" />

            <input type="text" placeholder="Senha atual" />

            <input type="text" placeholder="Nova senha" />

            <input type="text" placeholder="Confirmar senha" />

            <button type="submit">Confirmar mudanças</button>
          </form>
        </div>
      </main>
    </>
  );
}
