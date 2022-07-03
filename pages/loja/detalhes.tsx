import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout';
import OwnImage from '../../components/ownImage';
import { useAppContext } from '../../contexts/appContenxt';

const Details: NextPage = () => {
  const { productDetails } = useAppContext();
  const {
    name,
    flag,
    country,
    type,
    size,
    image,
    sommelierComment,
    discount,
    price,
    priceMember,
    priceNonMember,
  } = productDetails;

  const [adjustedImageURL, setAdjustedImageURL] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!productDetails.name) {
      router.push('/loja');
    } else {
      setAdjustedImageURL(image.replace('h=515', 'h=2048'));
    }
  }, [productDetails, router, image]);

  return !productDetails.name ? (
    <div></div>
  ) : (
    <Layout>
      <MobileContainer>
        <button type="button" onClick={() => router.back()}>
          {'<'} Voltar
        </button>
        <h2>{name}</h2>

        <div>
          <div>
            {adjustedImageURL && <OwnImage src={flag} alt={`Bandeira de ${country}`} />}
          </div>

          <span>{country}</span>
          <span>{type}</span>
          <span>{size}</span>
        </div>

        <div>
          {adjustedImageURL && (
            <OwnImage
              src={adjustedImageURL}
              alt={`Imagem do produto: ${name}`}
              responsive
            />
          )}
        </div>

        <div>
          <h2>Descrição</h2>
          <p>{sommelierComment}</p>
        </div>

        <div>
          <span>{discount}% OFF</span>

          <div>
            <span>R$ {price}</span>
            <span>
              R$<span>{priceMember}</span>
            </span>
            <span>PREÇO NÃO-SÓCIO R$ {priceNonMember}</span>
          </div>

          <button>Adicionar</button>
        </div>
      </MobileContainer>
    </Layout>
  );
};

export default Details;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button:nth-of-type(1) {
    align-self: flex-start;
    margin-block: 10px;
    margin-left: 10px;
    font-size: 1.1rem;
  }

  h2:nth-of-type(1) {
    text-align: center;
  }

  div:nth-of-type(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-block: 10px;

    div {
      width: 25px;
    }

    span {
      color: rgb(80, 80, 80);
      margin-inline: 5px;
    }
  }

  div:nth-of-type(2) {
    width: 80%;
  }

  div:nth-of-type(3) {
    text-align: left;
    margin-top: 20px;
    margin-bottom: 130px;

    h2 {
      text-align: left;
    }

    p {
      line-height: 25px;
      margin-top: 10px;
      color: rgb(80, 80, 80);
    }
  }

  div:nth-of-type(4) {
    position: fixed;
    background-color: rgb(255, 255, 255);
    width: 100%;
    bottom: 0px;
    right: 0;
    left: 0;
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;

    > span:nth-of-type(1) {
      position: absolute;
      top: -18px;
      left: 10px;
      background-color: rgb(242, 102, 73);
      color: rgb(255, 255, 255);
      border-radius: 5px;
      padding: 5px;
      font-size: 0.8rem;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      > span:nth-of-type(1) {
        text-decoration: line-through;
        font-size: 0.8rem;
      }

      span:nth-of-type(2) {
        color: rgb(184, 67, 110);
        margin-block: 5px;
        font-size: 0.8rem;

        span {
          color: inherit;
          font-size: 1.5rem;
        }
      }

      span:nth-of-type(3) {
        font-size: 0.8rem;
      }
    }

    button {
      background-color: rgb(126, 188, 67);
      color: rgb(245, 245, 245);
      width: 40%;
      font-size: 1rem;
      font-weight: 700;
      padding: 15px 0;
      border-radius: 5px;
      transition: 0.4s;
      align-self: center;

      :hover {
        background-color: rgb(101, 148, 57);
      }
    }
  }
`;
