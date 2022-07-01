import IProducts from './products';

export default interface IContext {
  productsInfo: Partial<IProducts>;
  handlePagination: (mobile: boolean, page?: number) => void;
  canSearch: boolean;
  currentPage: number;
}
