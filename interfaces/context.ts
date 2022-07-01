import IProducts from './products';

export default interface IContext {
  productsInfo: Partial<IProducts>;
  handleMobilePagination: () => void;
  canSearch: boolean;
  currentPage: number;
}
