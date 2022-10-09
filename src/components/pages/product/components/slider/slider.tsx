import {ErrorInfo, Loader, ProductCard} from '../../../../common/common';

import {Camera, Cameras} from '../../../../../types/camera';
import {LoadingStatusType} from '../../../../../types/types';
import {ErrorData, LoadingStatus, Step} from '../../../../../utils/const';
import {useAppDispatch} from '../../../../../hooks';

import useSlider from '../../../../../hooks/product-hooks/useSlider';
import {setBasket} from '../../../../../store/app-process/app-process';


interface SliderProps {
  similarCameras: Cameras;
  fetchStatus: LoadingStatusType;
}

const Slider = ({similarCameras, fetchStatus}: SliderProps):JSX.Element => {
  const dispatch = useAppDispatch();
  const {items, handlePreviousClick, handleNextClick, disabling} = useSlider(similarCameras, Step.Slider);

  const handleButtonAddToBasketClick = (data: Camera) => {
    dispatch(setBasket(data));
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
