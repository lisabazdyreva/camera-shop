import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {fetchHighPriceAction, fetchLowPriceAction} from '../../../../../../../store/api-actions/api-actions-filters/api-actions-filters';
import {useAppDispatch, useAppSelector} from '../../../../../../../hooks';
import {getHighPrice, getLowPrice} from '../../../../../../../store/filter-cameras/selectors';
import {getMaxPrice, getMinPrice} from '../../../../../../../store/filter-cameras/selectors';

import {AppRoute, PaginationRoute, QueryRoute} from '../../../../../../../utils/const';

import {setHighPrice, setLowPrice} from '../../../../../../../store/filter-cameras/filter-cameras';

interface IFilterPrice {
  lowPriceValue: number | string;
  onLowPriceChange: (value: number | string) => void;
  highPriceValue: number | string;
  onHighPriceChange: (value: number | string) => void;
}


const FilterPrice = ({lowPriceValue, onLowPriceChange, highPriceValue, onHighPriceChange}: IFilterPrice): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const maxPrice = useAppSelector(getMaxPrice);
  const minPrice = useAppSelector(getMinPrice);

  const highPriceStore = useAppSelector(getHighPrice);
  const lowPriceStore = useAppSelector(getLowPrice);

  const [isLowPriceInvalid, setIsLowPriceInvalid] = useState(false);
  const [isHighPriceInvalid, setIsHighPriceInvalid] = useState(false);

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const filter = evt.target.dataset.filter;

    const isNegative = Number(value) <= 0;
    const isEmpty = value === '';

    switch (filter) {
      case (QueryRoute.LowPrice): {
        if (isNegative || isEmpty) {
          onLowPriceChange('');
          setIsLowPriceInvalid(true);
          return;
        }
        onLowPriceChange(value);
        setIsLowPriceInvalid(false);
        break;
      }
      case (QueryRoute.HighPrice): {
        if (isNegative || isEmpty) {
          onHighPriceChange('');
          setIsHighPriceInvalid(true);
          return;
        }
        onHighPriceChange(value);
        setIsHighPriceInvalid(false);
        break;
      }
    }
  };

  const handleEnterKeyDown = (evt: React.KeyboardEvent) => {
    const currentTarget = evt.currentTarget as HTMLInputElement;
    if (evt.key === 'Enter') {
      currentTarget.blur();
    }
  };

  const handlePriceBlur = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    const filter = target.dataset.filter;

    switch (filter) {
      case QueryRoute.HighPrice: {
        if (highPriceValue === '') {
          dispatch(setHighPrice({value: ''}));
          return;
        }

        const getPrice = () => {
          if (Number(highPriceValue) > maxPrice) {
            return maxPrice;
          }

          if (Number(highPriceValue) < minPrice) {
            return minPrice;
          }

          if (Number(lowPriceValue) !== 0 && Number(lowPriceValue) > Number(highPriceValue)) {
            return Number(lowPriceValue) + 1;
          }

          return highPriceValue;

        };
        const price = getPrice();
        // if (price === highPriceStore) {
        //   onHighPriceChange(highPriceStore); // если то же самое вводим
        //   return; TODO mb useCallback
        // }
        dispatch(setHighPrice({value: price}));
        setIsHighPriceInvalid(false);
        break;
      }
      case QueryRoute.LowPrice: {
        if (lowPriceValue === '') {
          dispatch(setLowPrice({value: ''}));
          return;
        }

        const getPrice = () => {
          if (Number(lowPriceValue) < minPrice) {
            return minPrice;
          }

          if (Number(lowPriceValue) > maxPrice) {
            return maxPrice;
          }

          if (Number(highPriceValue) !== 0 && Number(lowPriceValue) > Number(highPriceValue)) {
            return Number(highPriceValue) - 1;
          }

          return lowPriceValue;
        };

        const price = getPrice();
        // if (price === lowPriceStore) {
        //   onLowPriceChange(lowPriceStore);
        //   return;
        // }
        dispatch(setLowPrice({value: price}));
        setIsLowPriceInvalid(false);
        break;
      }
    }
  };

  const updateParams = (route: string, value: number | string) => {

    if (searchParams.has(route)) {
      searchParams.delete(route);
    }
    searchParams.set(route, String(value));
    setSearchParams(searchParams);
  };


  useEffect(() => {
    if (highPriceStore) {
      dispatch(fetchHighPriceAction({value: Number(highPriceStore)}));
      onHighPriceChange(highPriceStore);
      updateParams(QueryRoute.HighPrice, highPriceStore);
      navigate(`${AppRoute.Catalog}${PaginationRoute.Page}${1}/?${searchParams.toString()}`);
    }
  }, [highPriceStore]);

  useEffect(() => {
    if (lowPriceStore) {
      dispatch(fetchLowPriceAction({value: Number(lowPriceStore)}));
      onLowPriceChange(lowPriceStore);
      updateParams(QueryRoute.LowPrice, lowPriceStore);
      navigate(`${AppRoute.Catalog}${PaginationRoute.Page}${1}/?${searchParams.toString()}`);
    }
  }, [lowPriceStore]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className={`custom-input ${isLowPriceInvalid && 'is-invalid'}`}>
          <label>
            <input
              data-filter={QueryRoute.LowPrice}
              type="number"
              name="price"
              onBlur={handlePriceBlur}
              onChange={handlePriceChange}
              placeholder={`от ${minPrice}`}
              value={lowPriceValue}
              onKeyDown={handleEnterKeyDown}
            />
          </label>
        </div>
        <div className={`custom-input ${isHighPriceInvalid && 'is-invalid'}`}>
          <label>
            <input
              data-filter={QueryRoute.HighPrice}
              type="number"
              name="priceUp"
              onBlur={handlePriceBlur}
              onChange={handlePriceChange}
              placeholder={`до ${maxPrice}`}
              value={highPriceValue}
              onKeyDown={handleEnterKeyDown}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default FilterPrice;
