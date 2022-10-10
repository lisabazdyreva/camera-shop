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
  TopCoordinate
} from '../../../utils/const';
import {useAppDispatch, useAppSelector} from '../../../hooks';

import {fetchCameraAction, fetchSimilarCamerasAction} from '../../../store/api-actions/api-actions-cameras/api-actions-cameras';
import {fetchReviewsAction} from '../../../store/api-actions/api-actions-reviews/api-actions-reviews';

import {getCamera, getCameraFetchStatus} from '../../../store/app-camera/selectors';
import {getSimilarCameras, getSimilarCamerasFetchStatus} from '../../../store/app-similar-cameras/selectors';
import {getReviewsFetchStatus} from '../../../store/app-reviews/selectors';


const Product = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const [isSuccessReviewModalOpen, setIsSuccessReviewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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
            {isCameraLoaded && camera && <ProductItem data={camera}/>}
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <Slider fetchStatus={similarCamerasFetchStatus} similarCameras={similarCameras} />
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button" onClick={() => setIsReviewModalOpen(true)}>Оставить свой отзыв</button>
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
            onSuccessModalOpen={() => setIsSuccessReviewModalOpen(true)}
            onModalClose={() => setIsReviewModalOpen(false)}
          />}
        {isSuccessReviewModalOpen
          &&
          <ModalInfo usingComponent={ComponentName.Product} onModalClose={() => setIsSuccessReviewModalOpen(false)}/> }
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
