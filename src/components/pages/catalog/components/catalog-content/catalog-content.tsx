import './catalog-content.css';

import {useEffect, useState} from 'react';

import {Pagination, Sorting} from '../components';
import {ErrorInfo, Loader, ProductCard} from '../../../../common/common';

import {Camera} from '../../../../../types/camera';

import {ErrorData, LoadingStatus, Step} from '../../../../../utils/const';
import {useAppSelector} from '../../../../../hooks';

import {getCamerasTotalCount} from '../../../../../store/process/selectors';
import {getCameras, getCamerasFetchStatus, getSortingCameras} from '../../../../../store/cameras/selectors';


interface CatalogContentProps {
  handleAddModal: (data: Camera) => void;
  currentPageNumber: number;
  setCurrentPageNumber: (pageNumber: number) => void;
}

const CatalogContent = ({handleAddModal, currentPageNumber, setCurrentPageNumber}: CatalogContentProps):JSX.Element => {
  const [pagesAmount, setPagesAmount] = useState(0);

  const fetchStatus = useAppSelector(getCamerasFetchStatus);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const camerasInitial = useAppSelector(getCameras);
  const sortingCameras = useAppSelector(getSortingCameras);

  const isCamerasLoaded = fetchStatus === LoadingStatus.Success;
  const isCamerasLoading = fetchStatus === LoadingStatus.Loading;
  const isCamerasError = fetchStatus === LoadingStatus.Error;


  useEffect(() => {
    setPagesAmount(Math.ceil( camerasTotalCount / Step.Pagination));
  }, [camerasTotalCount]);

  const cameras = !sortingCameras.length ? camerasInitial : sortingCameras;

  return (
    <div className="catalog__content" data-testid='catalog-content'>
      <Sorting />
      {isCamerasError && <ErrorInfo text={ErrorData.Catalog} />}
      {isCamerasLoading && <Loader />}
      {isCamerasLoaded &&
        <>
          <div className="cards catalog__cards">
            {cameras.map((camera) => (
              <ProductCard
                key={camera.id}
                handleAddModal={handleAddModal}
                data={camera}
              />
            ))}
          </div>
          {pagesAmount && <Pagination pagesAmount={pagesAmount} currentPageNumber={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber}/>}
        </>}
    </div>
  );
};

export default CatalogContent;
