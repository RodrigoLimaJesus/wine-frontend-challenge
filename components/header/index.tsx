import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import styled from 'styled-components';
import OwnImage from '../ownImage';
import IStyleProps from './interfaces/styleProps';

export default function Header() {
  const [hideMenu, setHideMenu] = useState(true);

  return (
    <HeaderComponent>
      <Wrap>
        <Button onClick={() => setHideMenu(false)}>
          <GiHamburgerMenu />
        </Button>

        <WrapLogo>
          <OwnImage src="/wine-logo.svg" alt="Logo empresa Wine" />
        </WrapLogo>
      </Wrap>

      <NavBar hideMenu={hideMenu}>
        <WrapCloseMenu>
          <CloseMenuButton onClick={() => setHideMenu(true)}>X</CloseMenuButton>
        </WrapCloseMenu>
      </NavBar>

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
  background: none;
  border: none;
  margin-inline: 10px;
  font-size: 1.5rem;
  width: 30px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapLogo = styled.div`
  width: 75px;
`;

const NavBar = styled.nav<IStyleProps>`
  height: 100vh;
  width: ${(props) => (props.hideMenu ? 0 : '60vw')};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  transition: 0.5s;
  overflow-x: hidden;
  background-color: rgb(245, 245, 245);
  box-shadow: rgba(0, 0, 0, 0.5) 50vw 0;
`;

const WrapCloseMenu = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseMenuButton = styled(Button)`
  margin: 10px;
`;

const CartButton = styled(Button)`
  width: 50px;
  background-color: rgb(246, 181, 84);
  border-radius: 100%;
  padding: 2px;
  overflow: hidden;
`;
