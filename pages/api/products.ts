import type { NextApiRequest, NextApiResponse } from 'next';
import IProducts from '../../interfaces/products';
import fetcher from '../../services/fetcher';
import mockProducts from '../../utils/mockProucts';

export default async function GetAllProducts(
  _req: NextApiRequest,
  res: NextApiResponse<IProducts>,
) {
  try {
    const allProducts = await fetcher('https://wine-back-test.herokuapp.com/products');

    return res.status(200).json(allProducts);
  } catch (error) {
    console.log(error);

    return res.status(400).json(mockProducts);
  }
}
