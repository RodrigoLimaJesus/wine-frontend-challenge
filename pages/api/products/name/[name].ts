import type { NextApiRequest, NextApiResponse } from 'next';
import IProducts from '../../../../interfaces/products';
import fetcher from '../../../../services/fetcher';
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

    const filredItems = allProducts.items.filter((product) => {
      const lowerProduct = product.name.toLocaleLowerCase();
      const lowerQuery = name.toLocaleLowerCase();

      return lowerProduct.includes(lowerQuery);
    });

    return res
      .status(200)
      .json({
        ...allProducts,
        totalPages: Math.ceil(filredItems.length / 10),
        totalItems: filredItems.length,
        items: filredItems,
      });
  } catch (error) {
    console.log(error);

    return res.status(400).json(mockProducts);
  }
}
