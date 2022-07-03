import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useId } from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout';
import OwnImage from '../../components/ownImage';
import { useAppContext } from '../../contexts/appContenxt';
import { Item } from '../../interfaces/products';
import IStyleProps from '../../interfaces/styleProps';

const Shop: NextPage = () => {
  const {
    productsInfo,
    handlePagination,
    currentPage,
    setPriceRange,
    handleSearchOptions,
    searchInput,
    handleCartItems,
    setProductDetails,
  } = useAppContext();
  const router = useRouter();
  const numberCurrPage = Number(currentPage);
  const priceFilters = [
    { id: useId(), label: 'Todos', min: 0, max: 0 },
    { id: useId(), label: 'Até R$40', min: 0, max: 40 },
    { id: useId(), label: 'R$40 a R$60', min: 40, max: 60 },
    { id: useId(), label: 'R$60 a R$200', min: 60, max: 200 },
    { id: useId(), label: 'R$200 a R$500', min: 200, max: 500 },
    { id: useId(), label: 'Acima de R$500', min: 500, max: 0 },
  ];

  function handleFilterPrice(min: number, max: number) {
    setPriceRange({ minPrice: min, maxPrice: max });
    if (min === 0 && max === 0) {
      if (searchInput.length > 0) {
        handleSearchOptions('name', min, max);
      } else {
        handleSearchOptions('page');
      }
      return;
    }

    handleSearchOptions('price', min, max);
  }

  function handleProductClick(product: Item) {
    setProductDetails(product);
    router.push('/loja/detalhes');
  }

  return (
    <Layout>
      <CountProducts>
        <span>{productsInfo?.totalItems} </span>
        <span>produtos encontrados</span>
      </CountProducts>
      <MainContainer>
        <PriceFilterContainer>
          <span>Refine sua busca</span>
          <span>Por preço</span>

          {priceFilters.map(({ id, label, min, max }) => (
            <label key={id}>
              <input
                type="radio"
                name="price-filter"
                onChange={() => handleFilterPrice(min, max)}
              />
              {label}
            </label>
          ))}
        </PriceFilterContainer>
        <div>
          <ProductsList>
            {productsInfo?.items?.map((product) => (
              <ProductCard key={product.id}>
                <div>
                  <OwnImage src={product.image} alt={product.name} />
                </div>

                <h4>{product.name}</h4>

                <div>
                  <span>{product.price} </span>
                  <span>{product.discount}% OFF</span>
                </div>

                <div>
                  <span>SÓCIO WINE</span>
                  <span>
                    R$ <span>{product.priceMember}</span>
                  </span>
                </div>

                <span>NÃO SÓCIO R${product.priceNonMember}</span>

                <ProductButton onClick={() => handleCartItems(product, 1)}>
                  Adicionar
                </ProductButton>

                <ProductDetailsButton onClick={() => handleProductClick(product)}>
                  Ver detalhes
                </ProductDetailsButton>
              </ProductCard>
            ))}
          </ProductsList>

          <PaginationMobile>
            <button
              disabled={currentPage >= Number(productsInfo?.totalPages)}
              onClick={() => {
                if (handlePagination) {
                  handlePagination(true, currentPage + 1);
                }
              }}
            >
              Mostrar mais
            </button>

            <div>
              <span>
                Exibindo <span>{productsInfo?.items?.length}</span> de
                <span> {productsInfo?.totalItems} </span>
                produtos no total
              </span>
            </div>
          </PaginationMobile>

          <PaginationDesktop>
            {numberCurrPage - 1 > 0 && (
              <>
                <PaginationText
                  active={false}
                  onClick={() => {
                    if (handlePagination) {
                      handlePagination(false, numberCurrPage - 1);
                    }
                  }}
                >
                  {'<<'} Anterior
                </PaginationText>
                <PaginationButton
                  active={false}
                  onClick={() => {
                    if (handlePagination) {
                      handlePagination(false, numberCurrPage - 1);
                    }
                  }}
                >
                  {numberCurrPage - 1}
                </PaginationButton>
              </>
            )}

            <PaginationButton
              active
              onClick={() => {
                if (handlePagination) {
                  handlePagination(false, numberCurrPage);
                }
              }}
            >
              {numberCurrPage}
            </PaginationButton>

            {productsInfo?.totalPages && numberCurrPage + 1 <= productsInfo?.totalPages && (
              <>
                <PaginationButton
                  active={false}
                  onClick={() => {
                    if (handlePagination) {
                      handlePagination(false, numberCurrPage + 1);
                    }
                  }}
                >
                  {numberCurrPage + 1}
                </PaginationButton>
                <PaginationText
                  active={false}
                  onClick={() => {
                    if (handlePagination) {
                      handlePagination(false, numberCurrPage + 1);
                    }
                  }}
                >
                  Próximo {'>>'}
                </PaginationText>
              </>
            )}
          </PaginationDesktop>
        </div>
      </MainContainer>
    </Layout>
  );
};

export default Shop;

const CountProducts = styled.div`
  padding-block: 15px;
  border-bottom: 1px solid rgb(180, 180, 180);

  span:nth-child(1) {
    font-weight: 700;
  }

  span:nth-child(2) {
    color: rgb(80, 80, 80);
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 790px) {
    flex-direction: row;
  }
`;

const PriceFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  min-width: 220px;

  span:nth-of-type(1) {
    font-size: 1.2rem;
    font-weight: 700;
  }

  span:nth-of-type(2) {
    margin-block: 10px;
  }

  input {
    margin-right: 5px;
    margin-block: 5px;
  }
`;

const ProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-block: 20px;
  justify-content: space-evenly;
`;

const ProductCard = styled.div`
  width: 45%;
  margin: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 10px;

  div:nth-of-type(1) {
    width: 100px;
    height: 120px;
  }

  h4 {
    text-align: center;
    font-size: 0.9rem;
  }

  div:nth-of-type(2) {
    margin-block: 8px;
    font-size: 0.8rem;

    span:nth-of-type(1) {
      margin-right: 8px;
      color: rgb(80, 80, 80);
      text-decoration: line-through;
    }

    span:nth-of-type(2) {
      background-color: rgb(245, 155, 93);
      color: rgb(255, 255, 255);
      border-radius: 5px;
      padding: 5px;
      font-weight: 700;
      font-size: 0.9rem;
    }
  }

  div:nth-of-type(3) {
    display: flex;
    justify-content: space-between;
    margin-block: 5px;

    span:nth-of-type(1) {
      display: block;
      text-align: center;
      width: 40%;
      color: rgb(80, 80, 80);
      font-size: 0.7rem;
    }

    span:nth-of-type(2) {
      display: flex;
      align-items: baseline;
      color: rgb(184, 67, 110);
      font-size: 0.7rem;
      font-weight: 700;

      span {
        color: inherit;
        font-size: 1.2rem;
        margin-left: 5px;
      }
    }
  }

  span:nth-child(5) {
    color: rgb(80, 80, 80);
    display: block;
    text-align: center;
    font-size: 0.7rem;
    margin-block: 5px;
  }

  @media screen and (min-width: 680px) {
    width: 30%;
  }

  @media screen and (min-width: 1024px) {
    width: 26%;
    margin: 15px;

    h4 {
      font-size: 1rem;
    }

    div:nth-of-type(2) {
      font-size: 1rem;

      span:nth-of-type(2) {
        font-size: 1.1rem;
      }
    }

    div:nth-of-type(3) {
      span:nth-of-type(1) {
        font-size: 0.8rem;
      }

      span:nth-of-type(2) {
        font-size: 0.9rem;

        span {
          font-size: 1.4rem;
        }
      }
    }

    span:nth-child(5) {
      font-size: 0.8rem;
    }
  }
`;

const ProductButton = styled.button`
  background-color: rgb(126, 188, 67);
  color: rgb(245, 245, 245);
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  padding: 8px;
  margin-block: 10px;
  border-radius: 5px;
  transition: 0.4s;

  :hover {
    background-color: rgb(101, 148, 57);
  }
`;

const ProductDetailsButton = styled.button`
  color: rgb(184, 67, 110);
  font-size: 0.9rem;

  @media screen and (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const PaginationMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  button {
    color: rgb(184, 67, 110);
    border: 2px solid rgb(184, 67, 110);
    border-radius: 10px;
    width: 50%;
    font-size: 1.4rem;
    font-weight: 700;
    padding: 10px;
    margin-bottom: 10px;
  }

  button:disabled {
    color: rgba(160, 65, 100, 0.7);
    border: 2px solid;
  }

  div > span {
    color: rgb(80, 80, 80);
  }

  div span span {
    color: black;
    font-weight: 700;
  }

  @media screen and (min-width: 790px) {
    display: none;
  }
`;

const PaginationDesktop = styled.div`
  display: none;

  @media screen and (min-width: 790px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
  }
`;

const PaginationButton = styled.button<IStyleProps>`
  font-size: 1.4rem;
  margin-inline: 5px;
  padding: 10px;
  border: 1px solid rgb(184, 67, 110);
  border-radius: 10px;
  color: ${(props) => (props.active ? 'rgb(245,245,245)' : 'rgb(184, 67, 110)')};
  background-color: ${(props) => (props.active ? 'rgb(184, 67, 110)' : 'transparent')};
`;

const PaginationText = styled(PaginationButton)`
  border: none;
  font-size: 1.2rem;
`;
