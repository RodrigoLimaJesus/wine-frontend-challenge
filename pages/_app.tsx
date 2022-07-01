import type { AppProps } from 'next/app';
import AppProvider from '../contexts/appProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
