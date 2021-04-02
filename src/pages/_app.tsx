import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SideBar } from '../components/Sidebar';

import { AuthProvider } from '../hooks/useAuth';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { asPath } = useRouter();
  return (
    <AuthProvider>
      {asPath !== '/' && asPath !== '/signup' && <SideBar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
