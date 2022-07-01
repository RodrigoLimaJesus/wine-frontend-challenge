import type { NextApiRequest, NextApiResponse } from 'next';
import IProducts from '../../../../interfaces/products';
import fetcher from '../../../../services/fetcher';
import mockProducts from '../../../../utils/mockProucts';

export default async function GetAllProducts(
  req: NextApiRequest,
  res: NextApiResponse<IProducts>,
) {
  try {
    const { page } = req.query;
    const allProducts: IProducts = await fetcher(
      `https://wine-back-test.herokuapp.com/products?page=${page}&limit=10`,
    );

    return res.status(200).json({ ...allProducts, personalItems: [] });
  } catch (error) {
    console.log(error);

    return res.status(400).json(mockProducts);
  }
}
