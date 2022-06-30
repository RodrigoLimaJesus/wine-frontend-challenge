import Head from 'next/head';
import ReactProps from '../../types/ReactProps';
import Header from '../header';
import styled from 'styled-components';

export default function Layout({ children }: ReactProps) {
  return (
    <div>
      <Head>
        <title>Wine | O maior clube de vinhos do mundo!</title>
        <meta
          name="description"
          content="Aplicação web desenvolvida por RodrigoLimaJesus como teste técnico para processo seletivo da empresa WINE."
        />
        <link rel="icon" href="/wine-bag.svg" />
      </Head>
      <Header />
      <Main>{children}</Main>
    </div>
  );
}

const Main = styled.main`
  background-color: rgb(245, 245, 245);
`;
