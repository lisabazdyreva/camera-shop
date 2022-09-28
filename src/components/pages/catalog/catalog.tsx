import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Pagination from '../../common/pagination/pagination';

import {
  Banner,
  ProductCard,
  Sorting,
  SideFilter,
} from './components/components';
import {Modal} from '../../common/common';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {getCameras, getPromos} from '../../../store/app-data/selectors';
import {initialCamera, LoadingStatus, CARDS_PER_PAGE, ComponentName, ModalContent} from '../../../utils/const';
import {Camera} from '../../../types/types';
import {getCamerasFetchStatus, getPromosFetchStatus} from '../../../store/app-status/selectors';
import {useParams} from 'react-router-dom';


const Catalog = () => {
  const params = useParams();
  const {pageNum} = params;

  const [selectedCameraData, setSelectedCameraData] = useState(initialCamera);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const [currentPageNumber, setCurrentPageNumber] = useState(Number(pageNum));

  const cameras = useSelector(getCameras);
  const promos = useSelector(getPromos);

  const promosFetchStatus = useSelector(getPromosFetchStatus);
  const camerasFetchStatus = useSelector(getCamerasFetchStatus);

  const indexOfLastPost = currentPageNumber * CARDS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - CARDS_PER_PAGE;
  const currentCameras = cameras.slice(indexOfFirstPost, indexOfLastPost);

  const handleAddModal = (data: Camera) => {
    setIsModalAddOpen(true);
    setSelectedCameraData(data);
  };

  return (
    <main>
      {promosFetchStatus === LoadingStatus.Success && <Banner promos={promos} />}
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <SideFilter />
              <div className="catalog__content">
                <Sorting />
                <div className="cards catalog__cards">
                  {
                    camerasFetchStatus === LoadingStatus.Success &&
                    currentCameras.map((camera) => <ProductCard key={camera.id} handleAddModal={handleAddModal} data={camera} />)
                  }
                </div>
                {camerasFetchStatus === LoadingStatus.Success && <Pagination camerasAmount={cameras.length} currentPageNumber={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber}/>}
              </div>
            </div>
          </div>
        </section>
      </div>
      {
        isModalAddOpen
        &&
        <Modal
          data={selectedCameraData}
          usingComponent={ComponentName.Catalog}
          modalType={ModalContent.Action}
          handleCloseModal={setIsModalAddOpen}
          handleOpenSuccessModal={setIsModalSuccessOpen}
        />
      }
      {/*TODO remove magic values*/}
      {isModalSuccessOpen && <Modal usingComponent={ComponentName.Catalog} modalType={ModalContent.Info} handleCloseModal={setIsModalSuccessOpen}/>}
    </main>
  );
};

export default Catalog;
