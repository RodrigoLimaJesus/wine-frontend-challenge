import { useEffect, useState } from 'react';
import IProducts from '../interfaces/products';
import IReactProps from '../interfaces/reactProps';
import fetcher from '../services/fetcher';
import { AppContext } from './appContenxt';

export default function AppProvider({ children }: IReactProps) {
  const [productsInfo, setProductsInfo] = useState<Partial<IProducts>>();
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [priceRange, setPriceRange] = useState<
    Partial<{ minPrice: string; maxPrice: string }>
  >({});
  const [currentPage, setCurrentPage] = useState(1);
  const [canSearch, setCanSearch] = useState(true);

  useEffect(() => {
    async function handldeSearch() {
      let fetchProducts: IProducts;

      if (searchType === 'page') {
        fetchProducts = await fetcher(`/api/products/page/${currentPage}`);
      } else if (searchType === 'name') {
        fetchProducts = await fetcher(`/api/products/name/${searchInput}`);
      } else if (searchType === 'price') {
        const { minPrice, maxPrice } = priceRange;
        fetchProducts = await fetcher(`/api/products/price/${minPrice}/${maxPrice}`);
      } else {
        fetchProducts = await fetcher(`/api/products/page/1`);
      }

      if (isMobile) {
        setProductsInfo((prev) => {
          const prevData = prev?.items || [];
          return { ...fetchProducts, items: [...prevData, ...fetchProducts.items] };
        });
        setIsMobile(false);
        setCanSearch(false);
        return;
      }

      setProductsInfo(fetchProducts);
      setCanSearch(false);
    }

    if (canSearch) {
      handldeSearch();
    }
  }, [canSearch, currentPage, isMobile, priceRange, searchInput, searchType]);

  const handleMobilePagination = () => {
    setIsMobile(true);
    setCurrentPage((prev) => prev + 1);
    setSearchType('page');
    setCanSearch(true);
  };

  return (
    <AppContext.Provider
      value={{ productsInfo, handleMobilePagination, canSearch, currentPage }}
    >
      {children}
    </AppContext.Provider>
  );
}
