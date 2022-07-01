import { FormEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import ISideBarProps from '../../../interfaces/sideBarProps';
import IStyleProps from '../../../interfaces/styleProps';

export default function SearchBar({ isHidden }: Partial<ISideBarProps>) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <SearchBarComponent hidden={isHidden} onSubmit={handleSubmit}>
      <input type="text" placeholder="Pesquisar" />

      <button type="submit">
        <AiOutlineSearch />
      </button>
    </SearchBarComponent>
  );
}

const SearchBarComponent = styled.form<IStyleProps>`
  display: flex;
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: rgb(245, 245, 245);
  width: 100vw;
  top: 80px;
  right: 0;
  padding: 15px;
  z-index: 1;

  input {
    background-color: rgb(255, 255, 255);
    padding: 8px;
    margin-right: 20px;
    font-size: 1rem;
    border-radius: 10px;
    width: 100%;
    border: 1px solid rgb(0, 0, 0);
  }

  button {
    font-size: 1.7rem;
    color: rgb(184, 67, 110);
  }

  @media screen and (min-width: 790px) {
    top: 90px;
    padding: 20px;
  }

  @media screen and (min-width: 1024px) {
    top: 100px;
    padding: 25px;

    button {
      font-size: 2rem;
    }
  }
`;
