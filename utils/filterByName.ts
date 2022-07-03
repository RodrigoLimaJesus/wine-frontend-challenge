import IProducts from '../interfaces/products';

export default function filterByName(allProducts: IProducts, name: string) {
  const filtredItems = allProducts.items.filter((product) => {
    const lowerProduct = product.name.toLocaleLowerCase();
    const lowerQuery = name.toLocaleLowerCase();

    return lowerProduct.includes(lowerQuery);
  });

  return filtredItems;
}
