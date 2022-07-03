import IProducts from '../interfaces/products';

export default function filterByPrice(
  allProducts: IProducts,
  minPrice: number,
  maxPrice: number,
) {
  const filtredItems = allProducts.items.filter(({ price }) => {
    if (minPrice !== 0 && maxPrice === 0) {
      return price >= minPrice;
    } else if (minPrice === 0 && maxPrice !== 0) {
      return price <= maxPrice;
    } else {
      return price >= minPrice && price <= maxPrice;
    }
  });

  return filtredItems;
}
