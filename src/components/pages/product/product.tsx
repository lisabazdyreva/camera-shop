import {
  ProductItem,
  ReviewListCard,
} from './components/components';
import {
  ModalInfo,
  ModalAction,
  Breadcrumbs, Loader, ErrorInfo
} from '../../common/common';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Slider} from './components/components';
import {ComponentName, BreadcrumbsItem, LoadingStatus, ErrorData} from '../../../utils/const';
import useProductDispatch from '../../../hooks/product-hooks/useProductDispatch';
import useProductSelectors from '../../../hooks/product-hooks/useProductSelectors';


const Product = () => {
  const params = useParams();
  const {id} = params;

  const [isSuccessReviewModalOpen, setIsSuccessReviewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useProductDispatch(Number(id));

  const {camera, reviews, similarCameras, cameraFetchStatus, similarCamerasFetchStatus, reviewsFetchStatus} = useProductSelectors();

  const isCameraLoaded = cameraFetchStatus === LoadingStatus.Success;
  const isCameraLoading = cameraFetchStatus === LoadingStatus.Loading;
  const isCameraError = cameraFetchStatus === LoadingStatus.Error;

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
                <ReviewListCard fetchStatus={reviewsFetchStatus} reviews={reviews}/>
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов</button>
                </div>
              </div>
            </section>
          </div>
        </div>
        { isReviewModalOpen && camera && <ModalAction data={camera} usingComponent={ComponentName.Product} handleOpenSuccessModal={setIsSuccessReviewModalOpen} handleCloseModal={setIsReviewModalOpen}/> }
        { isSuccessReviewModalOpen && <ModalInfo usingComponent={ComponentName.Product} handleCloseModal={setIsSuccessReviewModalOpen}/> }
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </>
  );
};

export default Product;
