import {
  Breadcrumbs
} from '../../common/common';

import {
  Banner,
  SideFilter, CatalogContent,
} from './components/components';
import {ModalInfo, ModalAction} from '../../common/common';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  initialCamera,
  LoadingStatus,
  Step,
  ComponentName,
  BreadcrumbsItem,
} from '../../../utils/const';
import {Camera} from '../../../types/types';
import {useParams} from 'react-router-dom';
import {setCurrentPage} from '../../../store/actions/actions';
import usePagination from '../../../hooks/catalog-hooks/usePagination';
import useCatalogSelectors from '../../../hooks/catalog-hooks/useCatalogSelectors';


const Catalog = () => {
  const dispatch = useDispatch();

  const [selectedCameraData, setSelectedCameraData] = useState(initialCamera);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const {cameras, promos, promosFetchStatus, camerasFetchStatus, currentPageNumber} = useCatalogSelectors();
  const {pages, currentItems} = usePagination(currentPageNumber, Step.Pagination, cameras);

  const params = useParams();
  const {pageNum} = params;

  const setCurrentPageNumber = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleAddModal = (data: Camera) => {
    setIsModalAddOpen(true);
    setSelectedCameraData(data);
  };

  const getPromoLevel = () => {
    const [promo] = promos;
    const promoId = promo.id;
    const promoCameras = cameras.filter((camera) => camera.id === promoId);
    const [promoCamera] = promoCameras;

    return promoCamera.level;
  };

  const isCamerasLoaded = camerasFetchStatus === LoadingStatus.Success;
  const isPromosLoaded = promosFetchStatus === LoadingStatus.Success;

  useEffect(() => {
    setCurrentPageNumber(Number(pageNum));
  }, []);


  const level = isPromosLoaded && isCamerasLoaded ? getPromoLevel() : '';

  return (
    <main>
      <Banner fetchStatus={promosFetchStatus} level={level} promos={promos} />
      <div className="page-content">
        <Breadcrumbs breadcrumbItems={BreadcrumbsItem.Catalog} usingComponent={ComponentName.Catalog}/>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <SideFilter />
              <CatalogContent
                fetchStatus={camerasFetchStatus}
                cards={currentItems}
                handleAddModal={handleAddModal}
                pages={pages}
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
