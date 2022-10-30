import './side-filter.css';

import {SyntheticEvent, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import FilterPrice from './components/filter-price/filter-price';

import {useAppDispatch, useAppSelector} from '../../../../../hooks';
import {filterParams} from '../../../../../utils/utils';
import {AppRoute, FilterCameraCategoryDictionary, FilterCameraLevelDictionary, FilterCameraTypeDictionary, QueryRoute} from '../../../../../utils/const';

import {removeCurrentFilter, resetFilters} from '../../../../../store/filter-cameras/filter-cameras';
import {getCurrentFilterCategory, getCurrentFilterLevel, getCurrentFilterType} from '../../../../../store/filter-cameras/selectors';
import {fetchPricesAction} from '../../../../../store/api-actions/api-actions-filters/api-actions-filters';


const SideFilter = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [lowPriceValue, setLowPriceValue] = useState<number | string>('');
  const [highPriceValue, setHighPriceValue] = useState<string | number>('');

  const currentCategories = useAppSelector(getCurrentFilterCategory);
  const currentTypes = useAppSelector(getCurrentFilterType);
  const currentLevels = useAppSelector(getCurrentFilterLevel);

  const checkDisabled = (categories: string[]) => {
    const isVideocamera = categories.find((item: string) => FilterCameraCategoryDictionary.Videocamera === item);
    return Boolean(isVideocamera);
  };

  const isChecked = (value: string, values: string[]) => {
    const checked = values.find((item) => item === value);
    if (value === FilterCameraTypeDictionary.Film || value === FilterCameraTypeDictionary.Snapshot) {
      const isDisabled = checkDisabled(currentCategories);

      if (isDisabled) {
        return false;
      }
    }
    return Boolean(checked);
  };

  const getVideocameraParams = (value: string, filter: string) => {
    const filmValue = FilterCameraTypeDictionary.Film;
    const snapshotValue = FilterCameraTypeDictionary.Snapshot;
    const filterType = QueryRoute.Type;

    dispatch(removeCurrentFilter({value: filmValue, filter: filterType}));
    dispatch(removeCurrentFilter({value: snapshotValue, filter: filterType}));

    const newSearchParams = filterParams(searchParams, [filmValue, snapshotValue]);
    newSearchParams.append(filter, value);
    return newSearchParams;
  };

  const getParams = (value: string, filter: string) => {
    if (value === FilterCameraCategoryDictionary.Videocamera) {
      return getVideocameraParams(value, filter);
    }

    return new URLSearchParams([...searchParams.entries(), [filter, value]]);
  };

  const getCheckedParams = (value: string, filter: string) => {
    dispatch(removeCurrentFilter({value, filter}));
    return(filterParams(searchParams, [value]));
  };

  const handleCheckboxChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    const currentTarget = evt.currentTarget as HTMLElement;

    const value = target.dataset.value;
    const filter = String(currentTarget.dataset.filter);

    let newSearchParams;

    if (target.checked && value) {
      newSearchParams = getParams(value, filter);
    }

    if (!target.checked && value) {
      newSearchParams = getCheckedParams(value, filter);
    }

    if (newSearchParams) {
      setSearchParams(newSearchParams);
      navigate(`${AppRoute.Catalog}${AppRoute.Page}1?${newSearchParams.toString()}`);
    }
  };

  const resetSearchParams = () => {
    Object.values(QueryRoute).forEach((param) => {
      if (param === QueryRoute.Sort || param === QueryRoute.Order) {
        return;
      }
      searchParams.delete(param);
    });
  };

  const handleFiltersFormReset = () => {
    dispatch(resetFilters());
    resetSearchParams();
    setSearchParams(searchParams);

    setLowPriceValue('');
    setHighPriceValue('');
  };

  useEffect(() => {
    dispatch(fetchPricesAction());
  }, [currentCategories, currentTypes, currentLevels, dispatch]);

  useEffect(() => () => {dispatch(resetFilters());}, [dispatch]);

  return (
    <div className="catalog__aside" data-testid='filter'>
      <div className="catalog-filter">
        <form onReset={handleFiltersFormReset}>
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterPrice
            lowPriceValue={lowPriceValue}
            onLowPriceChange={setLowPriceValue}
            highPriceValue={highPriceValue}
            onHighPriceChange={setHighPriceValue}
          />
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {
              Object.entries(FilterCameraCategoryDictionary).map(([categoryName, category]) => (
                <div className="custom-checkbox catalog-filter__item" key={categoryName}>
                  <label>
                    <input
                      type="checkbox"
                      name={categoryName[0].toLowerCase() + categoryName.slice(1)}
                      data-value={category}
                      data-filter={QueryRoute.Category}
                      onChange={handleCheckboxChange}
                      checked={isChecked(category, currentCategories)}
                    />
                    <span className="custom-checkbox__icon"></span>
                    <span className="custom-checkbox__label">{category}</span>
                  </label>
                </div>
              ))
            }
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            {
              Object.entries(FilterCameraTypeDictionary).map(([nameType, type]) => {
                const isDisabled = (type === FilterCameraTypeDictionary.Snapshot || type === FilterCameraTypeDictionary.Film)
                  && checkDisabled(currentCategories);

                const name = nameType[0].toLowerCase() + nameType.slice(1);

                return (
                  <div className="custom-checkbox catalog-filter__item" key={nameType}>
                    <label>
                      <input
                        type="checkbox"
                        name={name}
                        data-value={type}
                        data-filter={QueryRoute.Type}
                        onChange={handleCheckboxChange}
                        checked={isChecked(type, currentTypes)}
                        disabled={isDisabled}
                      />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">{type}</span>
                    </label>
                  </div>
                );
              })
            }
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {
              Object.entries(FilterCameraLevelDictionary).map(([levelName, level]) => (
                <div className="custom-checkbox catalog-filter__item" key={levelName}>
                  <label>
                    <input
                      type="checkbox"
                      name={levelName[0].toLowerCase() + levelName.slice(1)}
                      data-value={level}
                      data-filter={QueryRoute.Level}
                      onChange={handleCheckboxChange}
                      checked={isChecked(level, currentLevels)}
                    />
                    <span className="custom-checkbox__icon"></span>
                    <span className="custom-checkbox__label">{level}</span>
                  </label>
                </div>
              ))
            }
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры</button>
        </form>
      </div>
    </div>
  );
};

export default SideFilter;
