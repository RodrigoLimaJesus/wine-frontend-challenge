import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import OwnImage from '../components/ownImage';
import IProducts from '../interfaces/products';
import fetcher from '../services/fetcher';

const Shop: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [productsInfo, setProductsInfo] = useState<Partial<IProducts>>();
  const [currentPage, setCurrentPage] = useState(1);
  const [canPaginate, setCanPaginate] = useState(false);

  useEffect(() => {
    async function initialFetch() {
      const fetchProducts: IProducts = await fetcher('/api/products/page/1');

      setProductsInfo(fetchProducts);
      setIsMounted(true);
    }

    if (!isMounted) {
      initialFetch();
    }
  }, [isMounted]);

  useEffect(() => {
    async function handlePagination() {
      const fetchProducts: IProducts = await fetcher(`/api/products/page/${currentPage}`);

      setProductsInfo((prev) => {
        const prevItems = prev?.items || [];

        return { ...fetchProducts, items: [...prevItems, ...fetchProducts.items] };
      });
      setCanPaginate(false);
    }

    if (canPaginate) {
      handlePagination();
    }
  }, [canPaginate, currentPage]);

  return (
    <Layout>
      <CountProducts>
        <span>{productsInfo?.totalItems} </span>
        <span>produtos encontrados</span>
      </CountProducts>

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

            <ProductButton>Adicionar</ProductButton>
          </ProductCard>
        ))}
      </ProductsList>

      <PaginationContainer>
        <button
          disabled={currentPage === productsInfo?.totalPages || canPaginate}
          onClick={() => {
            setCanPaginate(true);
            setCurrentPage((prev) => prev + 1);
            setIsMounted(true);
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
      </PaginationContainer>
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

const ProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-block: 20px;
  justify-content: space-between;
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
`;

const PaginationContainer = styled.div`
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

  div > span {
    color: rgb(80, 80, 80);
  }

  div span span {
    color: black;
    font-weight: 700;
  }
`;
