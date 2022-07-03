import type { NextApiRequest, NextApiResponse } from 'next';
import IProducts from '../../../../interfaces/products';
import fetcher from '../../../../services/fetcher';
import filterByName from '../../../../utils/filterByName';
import groupItems from '../../../../utils/groupItems';
import mockProducts from '../../../../utils/mockProucts';

export default async function GetAllProducts(
  req: NextApiRequest,
  res: NextApiResponse<IProducts>,
) {
  try {
    const name = req.query.name as string;

    const allProducts: IProducts = await fetcher(
      'https://wine-back-test.herokuapp.com/products',
    );

    const filtredItems = filterByName(allProducts, name);

    const personalItems = groupItems(filtredItems);

    return res.status(200).json({
      ...allProducts,
      totalPages: personalItems.length,
      totalItems: filtredItems.length,
      items: [],
      personalItems,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json(mockProducts);
  }
}
