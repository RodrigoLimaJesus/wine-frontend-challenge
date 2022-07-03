import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function WorkInProgress() {
  const router = useRouter();

  return (
    <Container>
      <h2>
        Opa, ainda estamos desenvolvendo por aqui, por enquanto fique à vontade para
        conferir nossos produtos.
      </h2>

      <button onClick={() => router.push('/loja')}>Basta clicar aqui</button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vh;
  text-align: center;

  button {
    color: rgb(200, 26, 120);
    margin-top: 20px;
    font-size: 1.2rem;
  }

  button:hover {
    text-decoration: underline;
  }
`;
