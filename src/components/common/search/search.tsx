import './search.css';

import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Loader} from '../common';
import {AppRoute, LoadingStatus, SEARCH_ERROR_NOTIFICATION, WarningNotification, TabType} from '../../../utils/const';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {useFocus} from '../../../hooks/use-focus';
import {useDebounce} from '../../../hooks/use-debounce';

import {fetchCameraAction, fetchSearchCamerasAction} from '../../../store/api-actions/api-actions-cameras/api-actions-cameras';
import {getSearchedCameras, getSearchedCamerasFetchStatus} from '../../../store/cameras/selectors';


const Search = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchedCameras = useAppSelector(getSearchedCameras);
  const fetchStatus = useAppSelector(getSearchedCamerasFetchStatus);

  const [isListOpened, setIsListOpened] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const [inputRef, setFocus] = useFocus();
  const debouncedValue = useDebounce(searchValue);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!isListOpened) {
      setIsListOpened(true);
    }
    setSearchValue(evt.target.value);
  };

  const navigateToProduct = (evt: React.KeyboardEvent | SyntheticEvent) => {
    const target = evt.target as HTMLLIElement;
    const id = Number(target.dataset.id);

    dispatch(fetchCameraAction({id}))
      .then(() => {
        navigate(`${AppRoute.Product}/${id}/${TabType.Features}`);
        setIsListOpened(false);
        setSearchValue('');
      });
  };

  const handleListItemKeydown = (evt: React.KeyboardEvent) => {
    if (evt.code === 'Enter') {
      navigateToProduct(evt);
    }
  };

  const handleListItemClick = (evt: SyntheticEvent) => {
    navigateToProduct(evt);
  };

  const handleResetButtonClick = () => {
    setSearchValue('');
    setIsListOpened(false);
    setFocus();
  };

  useEffect(() => {
    if (debouncedValue !== '') {
      dispatch(fetchSearchCamerasAction(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    const outsideClickHandler = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (target.dataset.testid !== 'search-input' || target.className !== 'form-search__select-list') {
        setIsListOpened(false);
      }
    };

    if (isListOpened) {
      document.addEventListener('click', outsideClickHandler);
    } else {
      document.removeEventListener('click', outsideClickHandler);
    }

    return () => document.removeEventListener('click', outsideClickHandler);
  }, [isListOpened]);

  return (
    <div className={`form-search ${isListOpened && 'list-opened'}`} data-testid='form-search'>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleInputChange}
            value={searchValue}
            ref={inputRef}
            data-testid='search-input'
          />
        </label>
        <ul className="form-search__select-list scroller">
          {fetchStatus === LoadingStatus.Error && <li className="form-search__select-item">{SEARCH_ERROR_NOTIFICATION}</li>}
          {fetchStatus === LoadingStatus.Loading && <Loader />}
          {fetchStatus === LoadingStatus.Success && !searchedCameras.length && searchValue !== '' &&
            <li className="form-search__select-item" tabIndex={0}>{WarningNotification.Search}</li>}
          {
            searchedCameras.map((camera) => (
              <li
                key={camera.id}
                className="form-search__select-item"
                tabIndex={0}
                onClick={handleListItemClick}
                data-id={camera.id}
                onKeyDown={handleListItemKeydown}
              >
                {camera.name}
              </li>
            ))
          }
        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={handleResetButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default Search;
