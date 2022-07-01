import { Item } from '../interfaces/products';

export default function groupItems(apiItems: Item[]): Item[][] {
  const groupItems = apiItems.reduce<Item[][]>(
    (prev, curr) => {
      const lastIndex = prev.length - 1;

      if (prev[lastIndex] && prev[lastIndex].length === 10) {
        return [...prev, [curr]];
      }

      prev[lastIndex] = [...prev[lastIndex], curr];
      return prev;
    },
    [[]],
  );

  return groupItems;
}
