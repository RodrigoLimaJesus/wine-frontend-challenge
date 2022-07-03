import type { NextApiRequest, NextApiResponse } from 'next';
import IProducts from '../../../../../../interfaces/products';
import fetcher from '../../../../../../services/fetcher';
import filterByName from '../../../../../../utils/filterByName';
import filterByPrice from '../../../../../../utils/filterByPrice';
import groupItems from '../../../../../../utils/groupItems';
import mockProducts from '../../../../../../utils/mockProucts';

export default async function GetAllProducts(
  req: NextApiRequest,
  res: NextApiResponse<IProducts>,
) {
  try {
    const { minPrice, maxPrice } = req.query;
    const name = req.query.name as string;
    const numMinPrice = Number(minPrice);
    const numMaxPrice = Number(maxPrice);

    const allProducts: IProducts = await fetcher(
      'https://wine-back-test.herokuapp.com/products',
    );

    const productsByPrice = filterByPrice(allProducts, numMinPrice, numMaxPrice);
    const productsByName = filterByName({ ...allProducts, items: productsByPrice }, name);
    const personalItems = groupItems(productsByName);

    return res.status(200).json({
      ...allProducts,
      totalPages: personalItems.length,
      totalItems: productsByName.length,
      items: [],
      personalItems,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json(mockProducts);
  }
}
