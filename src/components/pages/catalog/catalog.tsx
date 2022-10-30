import './catalog.css';

import {useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';

import {Breadcrumbs, ModalInfo, ModalAction} from '../../common/common';
import {Banner, SideFilter, CatalogContent} from './components/components';

import {initialCamera, Step, ComponentName, BreadcrumbsItem, ModalActionName, ModalInfoName} from '../../../utils/const';
import {Camera} from '../../../types/camera';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import useQueryParams from '../../../hooks/use-query-params';

import {setCurrentPage, setCurrentPath} from '../../../store/process/process';
import {getAllSorting, getCurrentPage} from '../../../store/process/selectors';
import {getAllFilters} from '../../../store/filter-cameras/selectors';
import {fetchCamerasAction} from '../../../store/api-actions/api-actions-cameras/api-actions-cameras';
import {fetchPromosAction} from '../../../store/api-actions/api-actions-promo/api-actions-promo';


const Catalog = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [selectedCamera, setSelectedCamera] = useState(initialCamera);

  const [isCameraAddModalOpen, setIsCameraAddModalOpen] = useState(false);
  const [isCameraAddedSuccessModalOpen, setIsCameraAddedSuccessModalOpen] = useState(false);

  const currentPageNumber = useAppSelector(getCurrentPage);
  const allFilters = useAppSelector(getAllFilters);
  const allSorting = useAppSelector(getAllSorting);

  const params = useParams();
  const {pageNumber} = params;
  const pageNumberUrl = Number(pageNumber);

  const handlePageNumberClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleAddToBasketModalClose = () => {
    setIsCameraAddModalOpen(false);
  };

  const handleAddToBasketModalOpen = (data: Camera) => {
    setIsCameraAddModalOpen(true);
    setSelectedCamera(data);
  };

  const handleCameraAddedSuccessModalClose = () => {
    setIsCameraAddedSuccessModalOpen(false);
  };

  const handleCameraAddedSuccessModalOpen = () => {
    setIsCameraAddedSuccessModalOpen(true);
  };

  useQueryParams();

  useEffect(() => {
    dispatch(fetchPromosAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(pageNumberUrl));
    dispatch(setCurrentPath(searchParams.toString()));

    const startIndex = (pageNumberUrl - 1) * Step.Pagination;
    dispatch(fetchCamerasAction({startIndex}));
  }, [allFilters, allSorting, dispatch, currentPageNumber, pageNumberUrl, searchParams]);

  return (
    <main>
      <Banner />
      <div className="page-content">
        <Breadcrumbs breadcrumbItems={BreadcrumbsItem.Catalog} usingComponent={ComponentName.Catalog}/>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <SideFilter />
              <CatalogContent
                handleAddModal={handleAddToBasketModalOpen}
                currentPageNumber={currentPageNumber}
                setCurrentPageNumber={handlePageNumberClick}
              />
            </div>
          </div>
        </section>
      </div>
      {isCameraAddModalOpen
        &&
        <ModalAction
          data={selectedCamera}
          onActionModalClose={handleAddToBasketModalClose}
          onInfoModalOpen={handleCameraAddedSuccessModalOpen}
          modalActionType={ModalActionName.AddToBasket}
        />}
      {isCameraAddedSuccessModalOpen && <ModalInfo modalInfoType={ModalInfoName.AddedToBasket} onInfoModalClose={handleCameraAddedSuccessModalClose}/>}
    </main>
  );
};

export default Catalog;
