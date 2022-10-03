import {useDispatch} from 'react-redux';
import {ErrorInfo, Loader, ProductCard} from '../../../../common/common';
import {Camera} from '../../../../../types/types';
import useSlider from '../../../../../hooks/product-hooks/useSlider';
import {ErrorData, LoadingStatus, Step} from '../../../../../utils/const';

import {setBasket} from '../../../../../store/actions/actions';

interface SliderProps {
  similarCameras: Camera[];
  fetchStatus: string;
}

const Slider = ({similarCameras, fetchStatus}: SliderProps) => {
  const dispatch = useDispatch();
  const { items, handlePreviousClick, handleNextClick, disabling } = useSlider(similarCameras, Step.Slider);

  const handleAddBasketButtonClick = (data: Camera) => {
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
                  handleAddModal={handleAddBasketButtonClick}
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
