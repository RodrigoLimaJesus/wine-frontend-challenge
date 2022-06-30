import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Wine | O maior clube de vinhos do mundo!</title>
        <meta
          name="description"
          content="Aplicação web desenvolvida por RodrigoLimaJesus como teste técnico para processo seletivo da empresa WINE."
        />
        <link rel="icon" href="/wine.svg" />
      </Head>
    </div>
  );
};

export default Home;
