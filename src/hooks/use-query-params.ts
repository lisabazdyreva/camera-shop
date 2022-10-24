import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {QueryRoute} from '../utils/const';
import {useAppDispatch, useAppSelector} from './index';

import {setCurrentSortingOrder, setCurrentSortingType} from '../store/process/process';
import {setCurrentFilter, setHighPrice, setLowPrice} from '../store/filter-cameras/filter-cameras';
import {getCurrentFilterCategory, getCurrentFilterLevel, getCurrentFilterType} from '../store/filter-cameras/selectors';


const useQueryParams = () => {
  const dispatch = useAppDispatch();
  const [searchParams, ] = useSearchParams();

  const filterType = useAppSelector(getCurrentFilterType);
  const filterCategory = useAppSelector(getCurrentFilterCategory);
  const filterLevel = useAppSelector(getCurrentFilterLevel);

  useEffect(() => {
    const checkQueryParams = (queryParam: string) => searchParams && searchParams.has(queryParam);

    if (checkQueryParams(QueryRoute.Sort)) {
      dispatch(setCurrentSortingType(searchParams.get(QueryRoute.Sort)));
    }

    if (checkQueryParams(QueryRoute.Order)) {
      dispatch(setCurrentSortingOrder(searchParams.get(QueryRoute.Order)));
    }

    if(checkQueryParams(QueryRoute.Type)) {
      searchParams.getAll(QueryRoute.Type)
        .forEach((value) => {
          const isExist = filterType.some((type) => type === value);
          if (!isExist) {
            dispatch(setCurrentFilter({filter: QueryRoute.Type, value}));
          }
        });
    }

    if (checkQueryParams(QueryRoute.Category)) {
      searchParams.getAll(QueryRoute.Category)
        .forEach((value) => {
          const isExist = filterCategory.some((category) => category === value);
          if (!isExist){
            dispatch(setCurrentFilter({filter: QueryRoute.Category, value}));
          }
        });
    }

    if (checkQueryParams(QueryRoute.Level)) {
      searchParams.getAll(QueryRoute.Level)
        .forEach((value) => {
          const isExist = filterLevel.some((level) => level === value);
          if (!isExist) {
            dispatch(setCurrentFilter({filter: QueryRoute.Level, value}));
          }
        });
    }

    if (checkQueryParams(QueryRoute.HighPrice)) {
      const value = searchParams.get(QueryRoute.HighPrice);
      dispatch(setHighPrice({value}));
    }

    if (checkQueryParams(QueryRoute.LowPrice)) {
      const value = searchParams.get(QueryRoute.LowPrice);
      dispatch(setLowPrice({value}));
    }
  }, [dispatch, searchParams, filterCategory, filterLevel, filterType]);
};
export default useQueryParams;
