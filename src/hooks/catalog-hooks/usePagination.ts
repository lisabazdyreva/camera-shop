import {Camera} from '../../types/types';

const usePagination = (currentPage: number, step: number, arr: Camera[]) => {
  const indexLast = currentPage * step;
  const indexFirst = indexLast - step;
  const currentItems = arr.slice(indexFirst, indexLast);

  const pagesAmount = Math.ceil(arr.length / step);

  const pages = [];
  for (let i = 1; i <= pagesAmount; i++) {
    pages[i - 1] = i;
  }

  return {
    pages,
    currentItems,
  };
};

export default usePagination;
