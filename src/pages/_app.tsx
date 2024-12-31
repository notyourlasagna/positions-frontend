import '../styles/globals.css'; 
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>R E D N I A M - Job Positions</title>
      <meta name="description" content="Manage and review all of your job positions efficiently." />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  );
}

export default MyApp;
