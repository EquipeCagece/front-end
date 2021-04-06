import {
  FiPower,
  FiUser,
  FiSearch,
  FiPlusCircle,
  FiHeart,
} from 'react-icons/fi';

import { useAuth } from '../../hooks/useAuth';

import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function SideBar(): JSX.Element {
  const { signOut } = useAuth();

  return (
    <aside className={styles.container}>
      <nav>
        <ActiveLink activeClassName={styles.active} href="/profile">
          <a>
            <FiUser size={35} />
          </a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/pokedex">
          <a>
            <FiSearch size={35} />
          </a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/teams">
          <a>
            <FiPlusCircle size={35} />
          </a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/favorites">
          <a>
            <FiHeart size={35} />
          </a>
        </ActiveLink>
      </nav>

      <footer className={styles.signOut}>
        <button onClick={signOut} type="button">
          <FiPower size={35} />
        </button>
      </footer>
    </aside>
  );
}
