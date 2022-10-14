import './sorting.css';
import {ChangeEvent} from 'react';
import {SortingOrder, SortingType} from '../../../../../utils/const';
import {setCurrentSortingOrder, setCurrentSortingType} from '../../../../../store/process/process';
import {useAppDispatch, useAppSelector} from '../../../../../hooks';
import {getCurrentSortingOrder, getCurrentSortingType} from '../../../../../store/process/selectors';

const Sorting = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const currentSortingType = useAppSelector(getCurrentSortingType);
  const currentSortingOrder = useAppSelector(getCurrentSortingOrder);

  const handleSortingTypeClick = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    dispatch(setCurrentSortingType(target.dataset.value));
  };

  const handleSortingOrderClick = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    dispatch(setCurrentSortingOrder(target.dataset.value));

    if (!currentSortingType) {
      dispatch(setCurrentSortingType(SortingType.Price));
    }
  }; //не работает

  return (
    <div className="catalog-sort">
      <form action="src/components/pages/catalog/components/sorting/sorting#" data-testid='sorting-form'>
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={currentSortingType === SortingType.Price}
                data-value={SortingType.Price}
                onChange={handleSortingTypeClick}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={currentSortingType === SortingType.Rating}
                data-value={SortingType.Rating}
                onChange={handleSortingTypeClick}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={currentSortingOrder === SortingOrder.Ascending}
                data-value={SortingOrder.Ascending}
                onChange={handleSortingOrderClick}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={currentSortingOrder === SortingOrder.Descending}
                data-value={SortingOrder.Descending}
                onChange={handleSortingOrderClick}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sorting;
