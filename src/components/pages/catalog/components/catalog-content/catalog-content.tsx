import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {Pagination, Sorting} from '../components';
import {ErrorInfo, Loader, ProductCard} from '../../../../common/common';

import {Camera} from '../../../../../types/camera';

import {ErrorData, LoadingStatus} from '../../../../../utils/const';
import {getPages} from '../../../../../utils/utils';

import {getCamerasTotalCount} from '../../../../../store/app-process/selectors';
import {getCameras, getCamerasFetchStatus} from '../../../../../store/app-cameras/selectors';


interface CatalogContentProps {
  handleAddModal: (data: Camera) => void;
  currentPageNumber: number;
  setCurrentPageNumber: (pageNumber: number) => void;
}

const CatalogContent = ({handleAddModal, currentPageNumber, setCurrentPageNumber}: CatalogContentProps):JSX.Element => {
  const [pages, setPages] = useState<number[]>([]);

  const fetchStatus = useSelector(getCamerasFetchStatus);
  const camerasTotalCount = useSelector(getCamerasTotalCount);
  const cameras = useSelector(getCameras);

  const isCamerasLoaded = fetchStatus === LoadingStatus.Success;
  const isCamerasLoading = fetchStatus === LoadingStatus.Loading;
  const isCamerasError = fetchStatus === LoadingStatus.Error;


  useEffect(() => {
    const pagesNumbers = getPages(camerasTotalCount);
    setPages(pagesNumbers);
  }, [camerasTotalCount]);

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
          {pages.length && <Pagination pages={pages} currentPageNumber={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber}/>}
        </>}
    </div>
  );
};

export default CatalogContent;
