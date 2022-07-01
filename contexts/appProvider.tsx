import { useEffect, useState } from 'react';
import IPriceRange from '../interfaces/priceRange';
import IProducts from '../interfaces/products';
import IReactProps from '../interfaces/reactProps';
import fetcher from '../services/fetcher';
import { AppContext } from './appContenxt';

export default function AppProvider({ children }: IReactProps) {
  const [productsInfo, setProductsInfo] = useState<Partial<IProducts>>();
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [priceRange, setPriceRange] = useState<Partial<IPriceRange>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [canSearch, setCanSearch] = useState(true);

  useEffect(() => {
    function updateProductsInfo(fetchProducts: IProducts) {
      if (isMobile) {
        setProductsInfo((prev) => {
          const prevData = prev?.items || [];
          return { ...fetchProducts, items: [...prevData, ...fetchProducts.items] };
        });
      } else {
        setProductsInfo(fetchProducts);
      }

      setIsMobile(false);
      setCanSearch(false);
    }

    async function handldeSearch() {
      let fetchProducts: IProducts;

      const searchOptions = {
        page: async () => fetcher(`/api/products/page/${currentPage}`),
        name: async () => fetcher(`/api/products/name/${searchInput}`),
        price: async () => {
          const { minPrice, maxPrice } = priceRange;
          return fetcher(`/api/products/price/${minPrice}/${maxPrice}`);
        },
      };

      const existentOption = searchOptions[searchType as keyof typeof searchOptions];

      if (existentOption) {
        fetchProducts = await existentOption();
      } else {
        fetchProducts = await fetcher(`/api/products/page/1`);
      }

      updateProductsInfo(fetchProducts);
    }

    if (canSearch) {
      handldeSearch();
    }
  }, [canSearch, currentPage, isMobile, priceRange, searchInput, searchType]);

  function handlePagination(mobile: boolean, page: number = 1) {
    setSearchType('page');

    if (mobile) {
      setIsMobile(true);
      setCurrentPage((prev) => prev + 1);
      setCanSearch(true);
      return;
    }

    setCurrentPage(page);
    setCanSearch(true);
  }

  return (
    <AppContext.Provider
      value={{ productsInfo, handlePagination, canSearch, currentPage }}
    >
      {children}
    </AppContext.Provider>
  );
}
