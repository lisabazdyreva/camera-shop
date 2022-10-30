import './slider.css';

import {ErrorInfo, Loader, ProductCard} from '../../../../common/common';

import {Camera, Cameras} from '../../../../../types/camera';
import {LoadingStatusType} from '../../../../../types/types';
import {ACTIVE_CLASS, ErrorData, LoadingStatus} from '../../../../../utils/const';

import useSlider from '../../../../../hooks/use-slider';


interface SliderProps {
  similarCameras: Cameras;
  fetchStatus: LoadingStatusType;
  onCameraAddToBasket: (data: Camera) => void;
}

const Slider = ({similarCameras, fetchStatus, onCameraAddToBasket}: SliderProps):JSX.Element => {
  const {items, handlePreviousClick, handleNextClick, disabling} = useSlider(similarCameras);

  const handleAddToBasketButtonClick = (data: Camera) => {
    onCameraAddToBasket(data);
  };

  const isSimilarCamerasLoaded = fetchStatus === LoadingStatus.Success;

  return (
    <div className="product-similar__slider">
      {fetchStatus === LoadingStatus.Loading && <Loader />}
      {fetchStatus === LoadingStatus.Error && <ErrorInfo text={ErrorData.Catalog} />}
      {isSimilarCamerasLoaded &&
        <>
          <div className="product-similar__slider-list">
            {
              items.map((similarCamera) => (
                <ProductCard
                  handleAddModal={handleAddToBasketButtonClick}
                  data={similarCamera}
                  key={similarCamera.id}
                  additionalClass={ACTIVE_CLASS}
                />
              ))
            }
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            onClick={handlePreviousClick}
            disabled={disabling.isFirst}
            data-testid='button-slider-previous'
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            onClick={handleNextClick}
            disabled={disabling.isLast}
            data-testid='button-slider-next'
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </>}
    </div>
  );
};

export default Slider;
