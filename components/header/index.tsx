import { useRouter } from 'next/router';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';
import OwnImage from '../ownImage';
import SideBar from './components/sideBar';

export default function Header() {
  const [hideMenu, setHideMenu] = useState(true);
  const router = useRouter();

  return (
    <HeaderComponent>
      <Wrap>
        <Button onClick={() => setHideMenu(false)}>
          <GiHamburgerMenu />
        </Button>

        <WrapLogo onClick={() => router.push('/')}>
          <OwnImage src="/wine-logo.svg" alt="Logo empresa Wine" />
        </WrapLogo>
      </Wrap>

      <SideBar hideMenu={hideMenu} setHideMenu={setHideMenu} />

      <Wrap>
        <Button>
          <OwnImage
            src="/busca.svg"
            alt="Ícone de lupa para busca de produtos por nome"
          />
        </Button>

        <CartButton>
          <OwnImage
            src="/wine-bag.svg"
            alt="Ícone de sacola wine para mostrar o carrinho de compras"
          />
        </CartButton>
      </Wrap>
    </HeaderComponent>
  );
}

const HeaderComponent = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 3px rgba(80, 80, 80, 0.5);
  background-color: rgb(255, 255, 255);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 10px;
  font-size: 1.5rem;
  width: 30px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapLogo = styled.button`
  width: 75px;
`;

const CartButton = styled(Button)`
  width: 50px;
  background-color: rgb(246, 181, 84);
  border-radius: 100%;
  padding: 2px;
  overflow: hidden;
`;
