import type { NextApiRequest, NextApiResponse } from 'next';
import IProducts from '../../../../../interfaces/products';
import fetcher from '../../../../../services/fetcher';
import groupItems from '../../../../../utils/groupItems';
import mockProducts from '../../../../../utils/mockProucts';

export default async function GetAllProducts(
  req: NextApiRequest,
  res: NextApiResponse<IProducts>,
) {
  try {
    const { minPrice, maxPrice } = req.query;

    const numMinPrice = Number(minPrice);
    const numMaxPrice = Number(maxPrice);

    const allProducts: IProducts = await fetcher(
      'https://wine-back-test.herokuapp.com/products',
    );

    const filredItems = allProducts.items.filter(({ price }) => {
      if (numMinPrice !== 0 && numMaxPrice === 0) {
        return price >= numMinPrice;
      } else if (numMinPrice === 0 && numMaxPrice !== 0) {
        return price <= numMaxPrice;
      } else {
        return price >= numMinPrice && price <= numMaxPrice;
      }
    });

    const personalItems = groupItems(filredItems);

    return res.status(200).json({
      ...allProducts,
      totalPages: personalItems.length,
      totalItems: filredItems.length,
      items: [],
      personalItems,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json(mockProducts);
  }
}
