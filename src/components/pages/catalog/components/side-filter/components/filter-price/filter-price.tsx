import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';

import {fetchHighPriceAction, fetchLowPriceAction} from '../../../../../../../store/api-actions/api-actions-filters/api-actions-filters';
import {useAppDispatch, useAppSelector} from '../../../../../../../hooks';
import {getHighPrice, getLowPrice, getMaxPrice, getMinPrice} from '../../../../../../../store/filter-cameras/selectors';
import {setCurrentFilter, setUrl} from '../../../../../../../store/filter-cameras/filter-cameras';
import {FilterName} from '../../../../../../../utils/const';

interface IFilterPrice {
  lowPriceValue: number | string;
  onLowPriceChange: (value: number | string) => void;
  highPriceValue: number | string;
  onHighPriceChange: (value: number | string) => void;
}
//TODO какого вида url корректно сделать?
const FilterPrice = ({lowPriceValue, onLowPriceChange, highPriceValue, onHighPriceChange}: IFilterPrice): JSX.Element => {
  const dispatch = useAppDispatch();

  const maxPrice = useAppSelector(getMaxPrice);
  const minPrice = useAppSelector(getMinPrice);

  const highPrice = useAppSelector(getHighPrice);
  const lowPrice = useAppSelector(getLowPrice);

  const [isLowPriceInvalid, setIsLowPriceInvalid] = useState(false);
  const [isHighPriceInvalid, setIsHighPriceInvalid] = useState(false);

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    const filter = evt.target.dataset.filter;

    switch (filter) {
      case (FilterName.LowPrice): {
        if (value <= 0 || (highPriceValue !== '' && value > highPriceValue)) {
          onLowPriceChange('');
          setIsLowPriceInvalid(true);
          return;
        }

        onLowPriceChange(value);
        setIsLowPriceInvalid(false);
        break;
      }
      case (FilterName.HighPrice): {
        if (value <= 0) {
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
      case FilterName.HighPrice: {
        const price = highPriceValue > maxPrice ? maxPrice : highPrice;
        onHighPriceChange(price);
        setIsHighPriceInvalid(false);
        break;
      }
      case FilterName.LowPrice: {
        const price = lowPriceValue < minPrice ? minPrice : lowPrice;
        onLowPriceChange(price);
        setIsLowPriceInvalid(false);
        break;
      }
    }

    dispatch(setCurrentFilter({filter}));
    dispatch(setUrl());
  };

  useEffect(() => {
    dispatch(fetchLowPriceAction({
      value: lowPriceValue === '' ? minPrice : Number(lowPriceValue),
      min: minPrice
    }));
  }, [lowPriceValue, dispatch, minPrice]);

  useEffect(() => {
    dispatch(fetchHighPriceAction({
      value: highPriceValue === '' ? maxPrice : Number(highPriceValue),
      max: maxPrice
    }));
  }, [highPriceValue, dispatch, maxPrice]);
  //УЗНАТь Если в поле до ввести цену, которой нет среди данных сервера, то значение автоматом меняется на ближайшее максимальное из существующих.
  //Если указать одинаковый ценник в от и до, и данная цена есть в рамках диапазона, то показать товар с этой ценой. Если товара по цене данного диапазона нет — выходит сообщение «по вашему запросу ничего не найдено», вместо выдачи карточек.
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className={`custom-input ${isLowPriceInvalid && 'is-invalid'}`}>
          <label>
            <input
              data-filter={FilterName.LowPrice}
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
              data-filter={FilterName.HighPrice}
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
