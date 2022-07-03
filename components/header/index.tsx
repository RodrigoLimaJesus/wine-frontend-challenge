import { useRouter } from 'next/router';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';
import OwnImage from '../ownImage';
import CartButton from './components/cartButton';
import SearchBar from './components/searchBar';
import SideBar from './components/sideBar';

export default function Header() {
  const [hideSearch, setHideSearch] = useState(true);
  const [hideMenu, setHideMenu] = useState(true);
  const router = useRouter();

  return (
    <HeaderComponent>
      <Wrap>
        <MenuButton onClick={() => setHideMenu(false)}>
          <GiHamburgerMenu />
        </MenuButton>

        <WrapLogo onClick={() => router.push('/')}>
          <OwnImage src="/wine-logo.svg" alt="Logo empresa Wine" />
        </WrapLogo>
        <SideBar isHidden={hideMenu} setIsHidden={setHideMenu} />
      </Wrap>

      <Wrap>
        <Button
          data-testid="header-search-button"
          onClick={() => setHideSearch((prev) => !prev)}
        >
          <OwnImage
            src="/busca.svg"
            alt="Ícone de lupa para busca de produtos por nome"
          />
        </Button>

        <ProfileButton>
          <OwnImage
            src="/conta.svg"
            alt="Ícone de lupa para busca de produtos por nome"
          />
        </ProfileButton>

        <CartButton />
      </Wrap>

      <SearchBar isHidden={hideSearch} setIsHidden={setHideSearch} />
    </HeaderComponent>
  );
}

const HeaderComponent = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 3px rgba(80, 80, 80, 0.5);
  background-color: rgb(255, 255, 255);

  @media screen and (min-width: 790px) {
    padding-inline: 15px;
  }

  @media screen and (min-width: 1024px) {
    padding-inline: 20px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 10px;
  font-size: 1.5rem;
  width: 45px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapLogo = styled.button`
  width: 75px;

  @media screen and (min-width: 790px) {
    width: 85px;
    margin-right: 10px;
  }

  @media screen and (min-width: 1024px) {
    width: 95px;
    margin-right: 15px;
  }
`;

const ProfileButton = styled(Button)`
  display: none;

  @media screen and (min-width: 790px) {
    display: inherit;
  }
`;

const MenuButton = styled(Button)`
  @media screen and (min-width: 790px) {
    display: none;
  }
`;
