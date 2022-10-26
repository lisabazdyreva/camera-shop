import './slider.css';

import {ErrorInfo, Loader, ProductCard} from '../../../../common/common';

import {Camera, Cameras} from '../../../../../types/camera';
import {LoadingStatusType} from '../../../../../types/types';
import {ErrorData, LoadingStatus, Step} from '../../../../../utils/const';
// import {useAppDispatch} from '../../../../../hooks';

import useSlider from '../../../../../hooks/use-slider';
// import {setBasket} from '../../../../../store/process/process';


interface SliderProps {
  similarCameras: Cameras;
  fetchStatus: LoadingStatusType;
  handleAddCameraModalShow: (data: Camera) => void;
}

const Slider = ({similarCameras, fetchStatus, handleAddCameraModalShow}: SliderProps):JSX.Element => {
  // const dispatch = useAppDispatch();
  const {items, handlePreviousClick, handleNextClick, disabling} = useSlider(similarCameras, Step.Slider);

  const handleButtonAddToBasketClick = (data: Camera) => {
    // dispatch(setBasket(data));
    handleAddCameraModalShow(data);
  };

  const isSimilarCamerasLoaded = fetchStatus === LoadingStatus.Success;
  const isSimilarCamerasLoading = fetchStatus === LoadingStatus.Loading;
  const isSimilarCamerasError = fetchStatus === LoadingStatus.Error;

  return (
    <div className="product-similar__slider">
      {isSimilarCamerasLoading && <Loader />}
      {isSimilarCamerasError && <ErrorInfo text={ErrorData.Catalog} />}
      {isSimilarCamerasLoaded &&
        <>
          <div className="product-similar__slider-list">
            {
              items.map((similarCamera) => (
                <ProductCard
                  handleAddModal={handleButtonAddToBasketClick}
                  data={similarCamera}
                  key={similarCamera.id}
                  additionalClass={'is-active'}
                  withoutBasketImplementation
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
