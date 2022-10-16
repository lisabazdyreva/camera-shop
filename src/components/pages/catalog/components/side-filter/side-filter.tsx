import './side-filter.css';

import {SyntheticEvent, useRef, useState} from 'react';

import {useAppDispatch} from '../../../../../hooks';
import {
  FilterCameraCategoryDictionary,
  FilterCameraLevelDictionary,
  FilterCameraTypeDictionary, FilterName
} from '../../../../../utils/const';
import {
  removeCurrentFilter, resetFilters, resetPrices,
  setCurrentFilter, setUrl,
} from '../../../../../store/filter-cameras/filter-cameras';
import FilterPrice from './components/filter-price/filter-price';

//TODO менять url
const SideFilter = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const [lowPriceValue, setLowPriceValue] = useState<number | string>('');
  const [highPriceValue, setHighPriceValue] = useState<string | number>('');

  const inputFilmElement = useRef<null | HTMLInputElement>(null);
  const inputSnapshotElement = useRef<null | HTMLInputElement>(null);

  const handleFieldsetChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    const currentTarget = evt.currentTarget as HTMLElement;

    const value = target.dataset.value;

    if (value === FilterCameraCategoryDictionary.Videocamera) {
      if (inputFilmElement.current && inputSnapshotElement.current) {
        inputFilmElement.current.disabled = !inputFilmElement.current.disabled;
        inputSnapshotElement.current.disabled = !inputSnapshotElement.current.disabled;
      }
    }

    if (target.checked && value) {
      dispatch(setCurrentFilter({value, filter: currentTarget.dataset.filter}));
    }

    if (!target.checked) {
      dispatch(removeCurrentFilter({value, filter: currentTarget.dataset.filter}));
    }

    dispatch(setUrl());
  };

  const handleFiltersReset = () => {
    dispatch(resetFilters());
    dispatch(resetPrices());

    setLowPriceValue('');
    setHighPriceValue('');
  };

  return (
    <div className="catalog__aside" data-testid='filter'>
      <div className="catalog-filter">
        <form action="src/components/pages/catalog/components/side-filter/side-filter#" onReset={handleFiltersReset}>
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterPrice
            lowPriceValue={lowPriceValue}
            onLowPriceChange={setLowPriceValue}
            highPriceValue={highPriceValue}
            onHighPriceChange={setHighPriceValue}
          />
          <fieldset className="catalog-filter__block" data-filter={FilterName.Category} onChange={handleFieldsetChange}>
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="photocamera"
                  data-value={FilterCameraCategoryDictionary.Photocamera}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="videocamera"
                  data-value={FilterCameraCategoryDictionary.Videocamera}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block" data-filter={FilterName.Type} onChange={handleFieldsetChange}>
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="digital"
                  data-value={FilterCameraTypeDictionary.Digital}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="film"
                  ref={inputFilmElement}
                  data-value={FilterCameraTypeDictionary.Film}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="snapshot"
                  ref={inputSnapshotElement}
                  data-value={FilterCameraTypeDictionary.Snapshot}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="collection"
                  data-value={FilterCameraTypeDictionary.Collection}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block" data-filter={FilterName.Level} onChange={handleFieldsetChange}>
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="zero"
                  data-value={FilterCameraLevelDictionary.Zero}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="non-professional"
                  data-value={FilterCameraLevelDictionary['Non-professional']}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="professional"
                  data-value={FilterCameraLevelDictionary.Professional}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры</button>
        </form>
      </div>
    </div>
  );
};

export default SideFilter;
