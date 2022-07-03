import { useEffect, useState } from 'react';
import IPriceRange from '../interfaces/priceRange';
import IProducts from '../interfaces/products';
import IReactProps from '../interfaces/reactProps';
import fetcher from '../services/fetcher';
import { AppContext } from './appContenxt';

export default function AppProvider({ children }: IReactProps) {
  const [productsInfo, setProductsInfo] = useState<IProducts>({} as IProducts);
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [priceRange, setPriceRange] = useState<IPriceRange>({} as IPriceRange);
  const [currentPage, setCurrentPage] = useState(1);
  const [canSearch, setCanSearch] = useState(true);

  useEffect(() => {
    function updateProductsInfo(fetchProducts: IProducts) {
      const { personalItems } = fetchProducts;
      if (personalItems && personalItems.length > 0) {
        setProductsInfo({
          ...fetchProducts,
          items: [...personalItems[0]],
        });
      } else {
        if (isMobile) {
          setProductsInfo((prev) => {
            const prevData = prev.items || [];
            return { ...fetchProducts, items: [...prevData, ...fetchProducts.items] };
          });
        } else {
          setProductsInfo(fetchProducts);
        }
      }

      setIsMobile(false);
      setCanSearch(false);
    }

    async function handldeSearch() {
      let fetchProducts: IProducts;

      const searchOptions = {
        page: async () => await fetcher(`/api/products/page/${currentPage}`),
        name: async () => await fetcher(`/api/products/name/${searchInput}`),
        price: async () => {
          const { minPrice, maxPrice } = priceRange;
          return fetcher(`/api/products/price/${minPrice}/${maxPrice}`);
        },
        namePrice: async () => {
          const { minPrice, maxPrice } = priceRange;
          return fetcher(
            `/api/products/name-price/${searchInput}/${minPrice}/${maxPrice}`,
          );
        },
      };

      const existentOption = searchOptions[searchType as keyof typeof searchOptions];

      if (existentOption) {
        try {
          fetchProducts = await existentOption();
        } catch (error) {
          fetchProducts = await fetcher(`/api/products/page/1`);
        }
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
    const { personalItems } = productsInfo;

    if (personalItems && personalItems.length > 0) {
      if (mobile) {
        setProductsInfo((prev) => {
          const prevData = prev.items || [];
          return {
            ...productsInfo,
            items: [...prevData, ...prev.personalItems[page - 1]],
          };
        });
        setCurrentPage((prev) => prev + 1);
        return;
      }

      setProductsInfo((prev) => ({
        ...prev,
        items: prev.personalItems[page - 1],
      }));

      setCurrentPage(page);
    } else {
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
  }

  function handleSearchOptions(
    type: 'page' | 'name' | 'price' | 'namePrice',
    minPrice?: number,
    maxPrice?: number,
  ) {
    setCurrentPage(1);

    if (type === 'name' && (minPrice || maxPrice)) {
      setSearchType('namePrice');
    } else if (type === 'price' && searchInput.length > 0) {
      setSearchType('namePrice');
    } else {
      setSearchType(type);
    }

    setCanSearch(true);
  }

  return (
    <AppContext.Provider
      value={{
        productsInfo,
        handlePagination,
        canSearch,
        setCanSearch,
        handleSearchOptions,
        currentPage,
        searchInput,
        setSearchInput,
        priceRange,
        setPriceRange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
