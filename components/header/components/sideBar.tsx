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
      route: '/',
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
      <WrapCloseMenu>
        <button type="button" onClick={() => setHideMenu(true)}>
          X
        </button>
      </WrapCloseMenu>

      <WrapProfile>
        <div>
          <OwnImage src="/conta.svg" alt="Ícone padrão de um avatar de perfil" />
        </div>
        <div>
          <span>Acesse sua conta</span>
          <button type="button">
            ENTRAR <BsArrowRight />
          </button>
        </div>
      </WrapProfile>

      <NavBar>
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.route}
            type="button"
            onClick={() => router.push(navLink.route)}
            active={router.pathname === navLink.route}
          >
            {navLink.name}
          </NavLink>
        ))}
      </NavBar>
    </WrapSideBar>
  );
}

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
`;

const WrapCloseMenu = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    margin: 10px;
  }
`;

const WrapProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 10px;

  div:nth-child(1) {
    width: 30%;
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
`;

const NavBar = styled.nav`
  background-color: rgb(245, 245, 245);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NavLink = styled.button<IStyleProps>`
  color: ${(props) => (props.active ? 'rgb(184, 67, 110)' : 'rgb(0, 0, 0)')};
  margin: 10px;
  font-weight: 700;
  font-size: 1.2rem;
`;
