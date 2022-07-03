import styled from 'styled-components';
import { useAppContext } from '../../../contexts/appContenxt';
import OwnImage from '../../ownImage';

export default function CartButton() {
  const { countCartItems } = useAppContext();
  return (
    <CartButtonComponent>
      <OwnImage
        src="/wine-bag.svg"
        alt="Ícone de sacola wine para mostrar o carrinho de compras"
      />
      {countCartItems <= 9 ? <span>{countCartItems}</span> : <span>9+</span>}
    </CartButtonComponent>
  );
}

const CartButtonComponent = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 10px;
  font-size: 1.5rem;

  width: 50px;
  background-color: rgb(246, 181, 84);
  border-radius: 100%;
  position: relative;

  span:nth-of-type(1) {
    border-radius: inherit;
  }

  span:nth-of-type(2) {
    background-color: rgb(245, 245, 245);
    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 3px;
    color: rgb(79, 191, 165);
    position: absolute;
    bottom: -10px;
    right: 3px;
    padding: 2px 4px;
    border-radius: 50%;
    font-size: 1rem;
  }
`;
