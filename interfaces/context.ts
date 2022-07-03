import { Dispatch, SetStateAction } from 'react';
import IPriceRange from './priceRange';
import IProducts, { Item } from './products';
export default interface IContext {
  productsInfo: Partial<IProducts>;
  handlePagination: (mobile: boolean, page?: number) => void;
  canSearch: boolean;
  setCanSearch: Dispatch<SetStateAction<boolean>>;
  handleSearchOptions: (
    type: 'page' | 'name' | 'price' | 'namePrice',
    minPrice?: number,
    maxPrice?: number,
  ) => void;
  currentPage: number;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  priceRange: { minPrice: number; maxPrice: number };
  setPriceRange: Dispatch<SetStateAction<IPriceRange>>;
  handleCartItems: (item: Item, quantity: number) => void;
  countCartItems: number;
}
