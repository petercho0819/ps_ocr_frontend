import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import Layout from './layout';
import React from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from 'react-query';
import theme from '@/theme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const queryClient = new QueryClient();
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const filteredRoute = ['/', '/login'];

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout =
    Component.getLayout ??
    ((page) =>
      filteredRoute.includes(router.pathname) ? page : <Layout>{page}</Layout>);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
