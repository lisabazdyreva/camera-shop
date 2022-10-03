import {Pagination, Sorting} from '../components';
import {ErrorInfo, Loader, ProductCard} from '../../../../common/common';
import {ErrorData, LoadingStatus} from '../../../../../utils/const';
import {Camera} from '../../../../../types/types';

interface CatalogContentProps {
  fetchStatus: string;
  cards: Camera[];
  handleAddModal: (data: Camera) => void;
  pages: number[];
  currentPageNumber: number;
  setCurrentPageNumber: (pageNumber: number) => void;
}

const CatalogContent = ({fetchStatus, cards, handleAddModal, pages, currentPageNumber, setCurrentPageNumber}: CatalogContentProps) => {
  const isCamerasLoaded = fetchStatus === LoadingStatus.Success;
  const isCamerasLoading = fetchStatus === LoadingStatus.Loading;
  const isCamerasError = fetchStatus === LoadingStatus.Error;

  return (
    <div className="catalog__content">
      <Sorting />
      {isCamerasError && <ErrorInfo text={ErrorData.Catalog} />}
      {isCamerasLoading && <Loader />}
      {isCamerasLoaded &&
        <>
          <div className="cards catalog__cards">
            {cards.map((camera) => (
              <ProductCard
                key={camera.id}
                handleAddModal={handleAddModal}
                data={camera}
              />
            ))}
          </div>
          <Pagination pages={pages} currentPageNumber={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber}/>
        </>}
    </div>
  );
};

export default CatalogContent;
