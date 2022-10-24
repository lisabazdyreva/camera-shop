import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {fetchHighPriceAction, fetchLowPriceAction} from '../../../../../../../store/api-actions/api-actions-filters/api-actions-filters';
import {useAppDispatch, useAppSelector} from '../../../../../../../hooks';
import {getHighPrice, getLowPrice} from '../../../../../../../store/filter-cameras/selectors';
import {getMaxPrice, getMinPrice} from '../../../../../../../store/filter-cameras/selectors';

import {AppRoute, PaginationRoute, QueryRoute} from '../../../../../../../utils/const';

import {setHighPrice, setLowPrice} from '../../../../../../../store/filter-cameras/filter-cameras';

interface FilterPriceProps {
  lowPriceValue: number | string;
  onLowPriceChange: (value: number | string) => void;
  highPriceValue: number | string;
  onHighPriceChange: (value: number | string) => void;
}


const FilterPrice = ({lowPriceValue, onLowPriceChange, highPriceValue, onHighPriceChange}: FilterPriceProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const maxPrice = useAppSelector(getMaxPrice);
  const minPrice = useAppSelector(getMinPrice);

  const highPriceStore = useAppSelector(getHighPrice);
  const lowPriceStore = useAppSelector(getLowPrice);

  const [isLowPriceInvalid, setIsLowPriceInvalid] = useState(false);
  const [isHighPriceInvalid, setIsHighPriceInvalid] = useState(false);

  const [fixedLowPrice, setFixedLowPrice] = useState<string | number>(0);
  const [fixedHighPrice, setFixedHighPrice] = useState<string | number>(0);

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
        setIsHighPriceInvalid(false);
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
        setFixedHighPrice(price);
        break;
      }
      case QueryRoute.LowPrice: {
        setIsLowPriceInvalid(false);
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
        setFixedLowPrice(price);
        break;
      }
    }
  };

  const updateParams = useCallback((value: string | number, filter: string) => {
    if (searchParams.has(filter)) {
      searchParams.delete(filter);
    }
    if (value) {
      searchParams.set(filter, String(value));
    }

    setSearchParams(searchParams);
    navigate(`${AppRoute.Catalog}${PaginationRoute.Page}${1}/?${searchParams.toString()}`);
  }, [navigate, searchParams, setSearchParams]);

  useEffect(() => {
    dispatch(fetchHighPriceAction({value: Number(fixedHighPrice)}));
  }, [fixedHighPrice, dispatch]);

  useEffect(() => {
    onHighPriceChange(highPriceStore);
    updateParams(highPriceStore, QueryRoute.HighPrice);
  }, [highPriceStore, onHighPriceChange, updateParams]);

  useEffect(() => {
    dispatch(fetchLowPriceAction({value: Number(fixedLowPrice)}));
  }, [fixedLowPrice, dispatch]);

  useEffect(() => {
    onLowPriceChange(lowPriceStore);
    updateParams(lowPriceStore, QueryRoute.LowPrice);
  }, [lowPriceStore, onLowPriceChange, updateParams]);

  return (
    <fieldset className="catalog-filter__block" data-testid='price-filter'>
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
