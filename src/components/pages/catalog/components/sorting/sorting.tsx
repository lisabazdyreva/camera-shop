import './sorting.css';

import {useNavigate, useSearchParams} from 'react-router-dom';
import {ChangeEvent, useEffect} from 'react';

import {AppRoute, QueryRoute, SortingOrderDictionary, SortingOrder, SortingType, SortingTypeDictionary} from '../../../../../utils/const';
import {useAppDispatch, useAppSelector} from '../../../../../hooks';

import {getCurrentSortingOrder, getCurrentSortingType} from '../../../../../store/process/selectors';
import {resetSorting} from '../../../../../store/process/process';


const Sorting = ():JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentSortingType = useAppSelector(getCurrentSortingType);
  const currentSortingOrder = useAppSelector(getCurrentSortingOrder);

  const updateSearchParams = ([sortParam, orderParam]: [string, string][]) => {
    searchParams.delete(QueryRoute.Sort);
    searchParams.delete(QueryRoute.Order);

    searchParams.set(...sortParam);
    searchParams.set(...orderParam);

    setSearchParams(searchParams);
    navigate(`${AppRoute.Catalog}${AppRoute.Page}1?${searchParams.toString()}`);
  };

  const handleSortingTypeRadioChange = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const value = target.dataset.value;

    if (!currentSortingOrder && value) {
      updateSearchParams([[QueryRoute.Sort, value], [QueryRoute.Order, SortingOrder.Ascending]]);
    }
    if (value && currentSortingOrder) {
      updateSearchParams([[QueryRoute.Sort, value], [QueryRoute.Order, currentSortingOrder]]);
    }
  };

  const handleSortingOrderRadioChange = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const value = target.dataset.value;

    if (!currentSortingType && value) {
      updateSearchParams([[QueryRoute.Sort, SortingType.Price], [QueryRoute.Order, value]]);
    }
    if (value && currentSortingType) {
      updateSearchParams([[QueryRoute.Sort, currentSortingType], [QueryRoute.Order, value]]);
    }
  };

  useEffect(() => () => {
    dispatch(resetSorting());
    searchParams.delete(QueryRoute.Sort);
    searchParams.delete(QueryRoute.Order);
  }, [dispatch, searchParams]);

  return (
    <div className="catalog-sort">
      <form action="src/components/pages/catalog/components/sorting/sorting#" data-testid='sorting-form'>
        <div className="catalog-sort__inner">
          <p className="title title--h5">??????????????????????:</p>
          <div className="catalog-sort__type">
            {
              Object.values(SortingType).map((type) => {
                const id = `sort${type[0].toUpperCase() + type.slice(1)}`;
                return (
                  <div className="catalog-sort__btn-text" key={type}>
                    <input
                      type="radio"
                      id={id}
                      name="sort"
                      checked={currentSortingType === type}
                      data-value={type}
                      onChange={handleSortingTypeRadioChange}
                    />
                    <label htmlFor={id}>{type === SortingType.Price ? SortingTypeDictionary.Price : SortingTypeDictionary.Popular}</label>
                  </div>
                );
              })
            }
          </div>
          <div className="catalog-sort__order">
            {
              Object.values(SortingOrder).map((order) => (
                <div className={`catalog-sort__btn catalog-sort__btn--${order}`} key={order}>
                  <input
                    type="radio"
                    id={order}
                    name="sort-icon"
                    aria-label={order === SortingOrder.Ascending ? SortingOrderDictionary.Ascending : SortingOrderDictionary.Descending}
                    checked={currentSortingOrder === order}
                    data-value={order}
                    onChange={handleSortingOrderRadioChange}
                  />
                  <label htmlFor={order}>
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-sort"></use>
                    </svg>
                  </label>
                </div>
              ))
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sorting;
