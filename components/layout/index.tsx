import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import IReactProps from '../../interfaces/reactProps';
import Header from '../header';

export default function Layout({ children }: IReactProps) {
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
      <GlobalStyle />
      <Header />
      <Main>{children}</Main>
    </div>
  );
}

const Main = styled.main`
  overflow-x: hidden;
  padding: 20px;
`;

const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  border: none;
  background: none;
  }

  body {
    background-color: rgb(245, 245, 245);
  }

  button:hover {
    cursor: pointer;
  }
`;
