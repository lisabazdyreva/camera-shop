import './catalog.css';

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Breadcrumbs, ModalInfo, ModalAction} from '../../common/common';
import {Banner, SideFilter, CatalogContent} from './components/components';

import {initialCamera, Step, ComponentName, BreadcrumbsItem} from '../../../utils/const';
import {Camera} from '../../../types/camera';
import {useAppDispatch, useAppSelector} from '../../../hooks';

import {setCurrentPage} from '../../../store/process/process';
import {
  fetchCamerasAction,
  fetchSortingCamerasAction
} from '../../../store/api-actions/api-actions-cameras/api-actions-cameras';
import {fetchPromosAction} from '../../../store/api-actions/api-actions-promo/api-actions-promo';
import {getCurrentPage, getCurrentSortingOrder, getCurrentSortingType} from '../../../store/process/selectors';
import {SortingData} from '../../../types/types';


const Catalog = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const [selectedCameraData, setSelectedCameraData] = useState(initialCamera);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const currentPageNumber = useAppSelector(getCurrentPage);
  const currentSortingType = useAppSelector(getCurrentSortingType);
  const currentSortingOrder = useAppSelector(getCurrentSortingOrder);

  const params = useParams();
  const {pageNumber} = params;
  const pageNumberUrl = Number(pageNumber);

  const handlePageNumberClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleModalClose = () => {
    setIsModalAddOpen(false);
  };

  const handleSuccessModalClose = () => {
    setIsModalSuccessOpen(false);
  };

  const handleSuccessModalOpen = () => {
    setIsModalSuccessOpen(true);
  };

  const handleModalShow = (data: Camera) => {
    setIsModalAddOpen(true);
    setSelectedCameraData(data);
  };

  useEffect(() => {
    dispatch(fetchPromosAction());
  });

  useEffect(() => {
    dispatch(setCurrentPage(pageNumberUrl));
    const startIndex = (pageNumberUrl - 1) * Step.Pagination;

    if (currentSortingType) {
      const sortingData: SortingData = {
        limit: Step.Pagination,
        startIndex,
        sortingType: currentSortingType,
        sortingOrder: currentSortingOrder,
      };
      dispatch(fetchSortingCamerasAction(sortingData));
    } else {
      dispatch(fetchCamerasAction({limit: Step.Pagination, startIndex}));
    }

  }, [currentPageNumber, dispatch, pageNumberUrl, currentSortingType, currentSortingOrder]);

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
                handleAddModal={handleModalShow}
                currentPageNumber={currentPageNumber}
                setCurrentPageNumber={handlePageNumberClick}
              />
            </div>
          </div>
        </section>
      </div>
      {isModalAddOpen
        &&
        <ModalAction
          data={selectedCameraData}
          usingComponent={ComponentName.Catalog}
          onModalClose={handleModalClose}
          onSuccessModalOpen={handleSuccessModalOpen}
        />}
      {isModalSuccessOpen && <ModalInfo usingComponent={ComponentName.Catalog} onModalClose={handleSuccessModalClose}/>}
    </main>
  );
};

export default Catalog;
