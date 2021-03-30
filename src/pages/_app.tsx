import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SideBar } from '../components/Sidebar';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { asPath } = useRouter();
  return (
    <>
      {asPath !== '/' && asPath !== 'signup' && <SideBar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
