import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components';
import OwnImage from '../../ownImage';
import ISideBarProps from '../interfaces/sideBarProps';
import IStyleProps from '../interfaces/styleProps';

export default function SideBar({ hideMenu, setHideMenu }: ISideBarProps) {
  const router = useRouter();
  const navLinks = [
    {
      name: 'Clube',
      route: '/clube',
    },
    {
      name: 'Loja',
      route: '/loja',
    },
    {
      name: 'Produtores',
      route: '/produtores',
    },
    {
      name: 'Ofertas',
      route: '/ofertas',
    },
    {
      name: 'Eventos',
      route: '/eventos',
    },
  ];

  return (
    <WrapSideBar hideMenu={hideMenu}>
      <Shadow hidden={hideMenu} />
      <WrapCloseMenu>
        <button onClick={() => setHideMenu(true)}>X</button>
      </WrapCloseMenu>

      <WrapProfile>
        <div>
          <OwnImage src="/conta.svg" alt="Ícone padrão de um avatar de perfil" />
        </div>
        <div>
          <span>Acesse sua conta</span>
          <button>
            ENTRAR <BsArrowRight />
          </button>
        </div>
      </WrapProfile>

      <NavBar>
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.route}
            onClick={() => {
              setHideMenu(true);
              router.push(navLink.route);
            }}
            active={router.pathname === navLink.route}
          >
            {navLink.name}
          </NavLink>
        ))}
      </NavBar>
    </WrapSideBar>
  );
}

const Shadow = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: -1;

  @media screen and (min-width: 790px) {
    display: none;
  }
`;

const WrapSideBar = styled.div<IStyleProps>`
  height: 100vh;
  width: ${(props) => (props.hideMenu ? 0 : '70vw')};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  transition: 0.5s;
  overflow-x: hidden;
  background-color: rgb(255, 255, 255);

  @media screen and (min-width: 620px) {
    width: ${(props) => (props.hideMenu ? 0 : '50vw')};
  }

  @media screen and (min-width: 790px) {
    width: fit-content;
    height: fit-content;
    position: static;
    z-index: initial;
  }
`;

const WrapCloseMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: inherit;

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    margin: 10px;
  }

  @media screen and (min-width: 790px) {
    display: none;
  }
`;

const WrapProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  background-color: inherit;

  div:nth-child(1) {
    width: 100px;
    display: flex;
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    button {
      color: rgb(184, 67, 110);
      font-weight: 700;
      font-size: 0.8rem;
      margin-top: 5px;
      display: flex;
      align-items: center;
    }
  }

  @media screen and (min-width: 790px) {
    display: none;
  }
`;

const NavBar = styled.nav`
  background-color: rgb(245, 245, 245);
  height: 100%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: 790px) {
    background: none;
    flex-direction: row;
  }
`;

const NavLink = styled.button<IStyleProps>`
  color: ${(props) => (props.active ? 'rgb(184, 67, 110)' : 'rgb(0, 0, 0)')};
  margin: 10px;
  font-weight: 700;
  font-size: 1.2rem;
  transition: 0.4s;

  @media screen and (min-width: 790px) {
    color: ${(props) => (props.active ? 'rgb(184, 67, 110)' : 'rgb(100, 100, 100)')};
    height: 100%;
    :hover {
      color: rgb(184, 67, 110);
      border-bottom: solid 1px rgb(184, 67, 110);
    }
  }
`;
