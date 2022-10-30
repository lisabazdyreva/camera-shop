import './product-content.css';

import {ProductItem, ReviewListCard, Slider} from '../components';
import {Breadcrumbs, ErrorInfo, Loader} from '../../../../common/common';

import {BreadcrumbsItem, ComponentName, ErrorData, LoadingStatus} from '../../../../../utils/const';
import {Camera} from '../../../../../types/camera';
import {useAppSelector} from '../../../../../hooks';

import {getCameraFetchStatus} from '../../../../../store/camera/selectors';
import {getSimilarCameras, getSimilarCamerasFetchStatus} from '../../../../../store/similar-cameras/selectors';
import {getReviewsFetchStatus} from '../../../../../store/reviews/selectors';


interface ProductContentProps {
  camera: Camera | null;
  onCameraAddToBasket: (data: Camera) => void;
  onButtonAddReviewClick: () => void;
}


const ProductContent = ({camera, onCameraAddToBasket, onButtonAddReviewClick}: ProductContentProps): JSX.Element => {
  const cameraFetchStatus = useAppSelector(getCameraFetchStatus);

  const similarCameras = useAppSelector(getSimilarCameras);
  const similarCamerasFetchStatus = useAppSelector(getSimilarCamerasFetchStatus);
  const reviewsFetchStatus = useAppSelector(getReviewsFetchStatus);

  return (
    <div className="page-content">
      <Breadcrumbs breadcrumbItems={BreadcrumbsItem.Product} data={camera} usingComponent={ComponentName.Product}/>
      <div className="page-content__section">
        {cameraFetchStatus === LoadingStatus.Error && <ErrorInfo text={ErrorData.Product} />}
        {cameraFetchStatus === LoadingStatus.Loading && <Loader />}
        {cameraFetchStatus === LoadingStatus.Success && camera &&
          <ProductItem data={camera} onCameraAddToBasket={onCameraAddToBasket}/>}
      </div>
      <div className="page-content__section">
        <section className="product-similar">
          <div className="container">
            <h2 className="title title--h3">Похожие товары</h2>
            <Slider
              fetchStatus={similarCamerasFetchStatus}
              similarCameras={similarCameras}
              onCameraAddToBasket={onCameraAddToBasket}
            />
          </div>
        </section>
      </div>
      <div className="page-content__section">
        <section className="review-block">
          <div className="container">
            <div className="page-content__headed">
              <h2 className="title title--h3">Отзывы</h2>
              <button className="btn" type="button" onClick={onButtonAddReviewClick}>Оставить свой отзыв</button>
            </div>
            <ReviewListCard fetchStatus={reviewsFetchStatus}/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductContent;
