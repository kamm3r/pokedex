import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
