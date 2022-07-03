import { Dispatch, SetStateAction } from 'react';
import IPriceRange from './priceRange';
import IProducts from './products';
export default interface IContext {
  productsInfo: Partial<IProducts>;
  handlePagination: (mobile: boolean, page?: number) => void;
  canSearch: boolean;
  setCanSearch: Dispatch<SetStateAction<boolean>>;
  handleSearchOptions: (type: 'page' | 'name' | 'price') => void;
  currentPage: number;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  setPriceRange: Dispatch<SetStateAction<IPriceRange>>;
}
