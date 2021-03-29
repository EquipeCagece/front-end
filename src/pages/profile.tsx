import Head from 'next/head';
import { FiCamera } from 'react-icons/fi';
import { SideBar } from '../components/Sidebar';

export default function Profile(): JSX.Element {
  return (
    <>
      <Head>
        <title>Pokedex | Perfil</title>
      </Head>
      <div>
        <SideBar />

        <nav>
          <form>
            <div>
              <img src="" alt="" />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" />
              </label>
            </div>

            <input type="text" placeholder="Nome" />
          </form>
        </nav>
      </div>
    </>
  );
}
