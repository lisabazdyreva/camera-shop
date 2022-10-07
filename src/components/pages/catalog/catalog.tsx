import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {Breadcrumbs, ModalInfo, ModalAction} from '../../common/common';
import {Banner, SideFilter, CatalogContent} from './components/components';

import {initialCamera, Step, ComponentName, BreadcrumbsItem} from '../../../utils/const';
import {Camera} from '../../../types/camera';
import {AppDispatch} from '../../../types/state';

import {setCurrentPage} from '../../../store/app-process/app-process';
import {fetchCamerasAction} from '../../../store/api-actions/api-actions-cameras';
import {fetchPromosAction} from '../../../store/api-actions/api-actions-promo';
import {getCurrentPage} from '../../../store/app-process/selectors';


const Catalog = ():JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCameraData, setSelectedCameraData] = useState(initialCamera);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const currentPageNumber = useSelector(getCurrentPage);

  const params = useParams();
  const {pageNumber} = params;
  const pageNumberUrl = Number(pageNumber);

  const setCurrentPageNumber = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleAddModal = (data: Camera) => {
    setIsModalAddOpen(true);
    setSelectedCameraData(data);
  };

  const fetchCameras = (page: number) => {
    const startIndex = (page - 1) * Step.Pagination;
    dispatch(fetchCamerasAction({limit: Step.Pagination, startIndex}));
  };

  useEffect(() => {
    dispatch(fetchPromosAction());
  }, []);

  useEffect(() => {
    setCurrentPageNumber(pageNumberUrl);
    fetchCameras(pageNumberUrl);
  }, [currentPageNumber]);

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
                handleAddModal={handleAddModal}
                currentPageNumber={currentPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
              />
            </div>
          </div>
        </section>
      </div>
      {
        isModalAddOpen
        &&
        <ModalAction
          data={selectedCameraData}
          usingComponent={ComponentName.Catalog}
          handleCloseModal={setIsModalAddOpen}
          handleOpenSuccessModal={setIsModalSuccessOpen}
        />
      }
      {isModalSuccessOpen && <ModalInfo usingComponent={ComponentName.Catalog} handleCloseModal={setIsModalSuccessOpen}/>}
    </main>
  );
};

export default Catalog;
