import { useEffect, useState } from 'react';
import IPriceRange from '../interfaces/priceRange';
import IProducts, { Item } from '../interfaces/products';
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
  const [isMounted, setIsMounted] = useState(false);
  const [cartItems, setCartItems] = useState([] as Item[]);
  const [countCartItems, setCountCartItems] = useState(0);

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

  useEffect(() => {
    if (!isMounted) {
      const storageCartItems = localStorage.getItem('cartItems') || '[]';
      setCartItems(JSON.parse(storageCartItems));
      setIsMounted(true);
    } else {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      const itemsInCart = cartItems.reduce(
        (prev, curr) => prev + Number(curr.qtyInCart),
        0,
      );
      setCountCartItems(itemsInCart);
    }
  }, [cartItems, isMounted]);

  function handleCartItems(item: Item, quantity: number) {
    const productInCart = cartItems.find(({ id }) => id === item.id);
    let numberInCart = 0;

    if (!productInCart) {
      if (quantity > 0) {
        setCartItems((prev) => [...prev, { ...item, qtyInCart: 1 }]);
      }
      return;
    } else {
      numberInCart = productInCart.qtyInCart || 0;
    }

    if (!numberInCart || numberInCart + quantity === 0) {
      setCartItems((prev) => prev.filter(({ id }) => id !== item.id));
      return;
    }

    setCartItems((prev) =>
      prev.map((product) => {
        if (item.id === product.id) {
          return { ...item, qtyInCart: numberInCart + quantity };
        }

        return product;
      }),
    );
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
        handleCartItems,
        countCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
