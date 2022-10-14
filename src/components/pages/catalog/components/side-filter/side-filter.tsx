import './side-filter.css';

import {SyntheticEvent} from 'react';

import {useAppDispatch} from '../../../../../hooks';
import {
  FilterCameraCategoryDictionary,
  FilterCameraLevelDictionary,
  FilterCameraTypeDictionary
} from '../../../../../utils/const';
import {
  removeCurrentFilter,
  setCurrentFilter,
} from '../../../../../store/filter-cameras/filter-cameras';

//TODO менять url
const SideFilter = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFieldsetChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    const currentTarget = evt.currentTarget as HTMLElement;

    const value = target.dataset.value;

    if (target.checked && value) {
      dispatch(setCurrentFilter({value, filter: currentTarget.dataset.filter}));
    }

    if (!target.checked) {
      dispatch(removeCurrentFilter({value, filter: currentTarget.dataset.filter}));
    }
  };

  return (
    <div className="catalog__aside" data-testid='filter'>
      <div className="catalog-filter">
        <form action="src/components/pages/catalog/components/side-filter/side-filter#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до" />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block" data-filter='category' onChange={handleFieldsetChange}>
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
          <fieldset className="catalog-filter__block" data-filter='type' onChange={handleFieldsetChange}>
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
                  // disabled={categorySelected === FilterCameraCategoryDictionary.Videocamera}
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
                  // disabled={categorySelected === FilterCameraCategoryDictionary.Videocamera}
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
          <fieldset className="catalog-filter__block" data-filter='level' onChange={handleFieldsetChange}>
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
