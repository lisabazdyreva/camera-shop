import './product.css';

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {ProductItem, ReviewListCard, Slider} from './components/components';
import {
  ModalInfo,
  ModalAction,
  Breadcrumbs,
  Loader,
  ErrorInfo
} from '../../common/common';

import {
  ComponentName,
  BreadcrumbsItem,
  LoadingStatus,
  ErrorData,
  ScrollSetting,
  TopCoordinate,
  initialCamera
} from '../../../utils/const';
import {useAppDispatch, useAppSelector} from '../../../hooks';

import {fetchCameraAction, fetchSimilarCamerasAction} from '../../../store/api-actions/api-actions-cameras/api-actions-cameras';
import {fetchReviewsAction} from '../../../store/api-actions/api-actions-reviews/api-actions-reviews';

import {getCamera, getCameraFetchStatus} from '../../../store/camera/selectors';
import {getSimilarCameras, getSimilarCamerasFetchStatus} from '../../../store/similar-cameras/selectors';
import {getReviewsFetchStatus} from '../../../store/reviews/selectors';
import {Camera} from '../../../types/camera';


const Product = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const [isSuccessReviewModalOpen, setIsSuccessReviewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [isAddCameraModalOpen, setAddCameraModalOpen] = useState(false);
  const [isSuccessAddCameraModalOpen, setSuccessAddCameraModalOpen] = useState(false);

  const [selectedCamera, setSelectedCamera] = useState(initialCamera);

  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);

  const cameraFetchStatus = useAppSelector(getCameraFetchStatus);
  const similarCamerasFetchStatus = useAppSelector(getSimilarCamerasFetchStatus);
  const reviewsFetchStatus = useAppSelector(getReviewsFetchStatus);

  const params = useParams();
  const {id} = params;

  const isCameraLoaded = cameraFetchStatus === LoadingStatus.Success;
  const isCameraLoading = cameraFetchStatus === LoadingStatus.Loading;
  const isCameraError = cameraFetchStatus === LoadingStatus.Error;

  const handleButtonToTopClick = () => {
    window.scrollTo(ScrollSetting);
  };

  const handleButtonAddReviewClick = () => {
    setIsReviewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsReviewModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessReviewModalOpen(false);
  };

  const handleSuccessModalOpen = () => {
    setIsSuccessReviewModalOpen(true);
  };

  const handleAddModalHide = () => {
    setAddCameraModalOpen(false);
  };

  const handleSuccessModalShow = () => {
    setSuccessAddCameraModalOpen(true);
  };

  const handleSuccessModalHide = () => {
    setSuccessAddCameraModalOpen(false);
  };

  const handleSliderCameraSelect = (data: Camera) => { //TODO naming
    setSelectedCamera(data);
    setAddCameraModalOpen(true);
  };

  const handleProductCameraSelect = (data: Camera) => { //TODO naming
    setSelectedCamera(data);
    setAddCameraModalOpen(true);
  };

  useEffect(() => {
    if (id) {
      const numberId = Number(id);
      const data = {id: numberId};

      dispatch(fetchCameraAction(data));
      dispatch(fetchReviewsAction(data));
      dispatch(fetchSimilarCamerasAction(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    window.scrollTo(TopCoordinate.X, TopCoordinate.Y);
  }, []);

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs breadcrumbItems={BreadcrumbsItem.Product} data={camera} usingComponent={ComponentName.Product}/>
          <div className="page-content__section">
            {isCameraError && <ErrorInfo text={ErrorData.Product} />}
            {isCameraLoading && <Loader />}
            {isCameraLoaded && camera && <ProductItem data={camera} handleAddCameraModalShow={handleProductCameraSelect}/>}
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <Slider fetchStatus={similarCamerasFetchStatus} similarCameras={similarCameras} handleAddCameraModalShow={handleSliderCameraSelect}/>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button" onClick={handleButtonAddReviewClick}>Оставить свой отзыв</button>
                </div>
                <ReviewListCard fetchStatus={reviewsFetchStatus}/>
              </div>
            </section>
          </div>
        </div>
        {isReviewModalOpen && camera
          &&
          <ModalAction
            data={camera}
            usingComponent={ComponentName.Product}
            onSuccessModalOpen={handleSuccessModalOpen}
            onModalClose={handleModalClose}
          />}
        {isSuccessReviewModalOpen
          &&
          <ModalInfo usingComponent={ComponentName.Product} onModalClose={handleSuccessModalClose}/> }
        {isAddCameraModalOpen && camera &&
          <ModalAction
            data={selectedCamera}
            usingComponent={ComponentName.Catalog}
            onModalClose={handleAddModalHide}
            onSuccessModalOpen={handleSuccessModalShow}
          />} {/*TODO naming и отправлять камеру в зависимости от жмяка*/}
        {isSuccessAddCameraModalOpen && <ModalInfo usingComponent={ComponentName.Catalog} onModalClose={handleSuccessModalHide}/>}
      </main>
      <button className="up-btn" type='button' onClick={handleButtonToTopClick}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
    </>
  );
};

export default Product;
