// import {useSelector} from 'react-redux';
// import {getCamerasTotalCount, getCurrentPage} from '../../store/app-process/selectors';
//
// const usePagination = (step: number) => {
//   const currentPage = useSelector(getCurrentPage);
//   const camerasTotalCount = useSelector(getCamerasTotalCount);
//
//   const startIndex = (currentPage - 1) * step;
//   const pagesAmount = Math.ceil( camerasTotalCount / step);
//
//   const pages = [];
//   for (let i = 1; i <= pagesAmount; i++) {
//     pages[i - 1] = i;
//   }
//
//   return {
//     startIndex,
//     pages,
//   };
// };
//
// export default usePagination;
export {};
