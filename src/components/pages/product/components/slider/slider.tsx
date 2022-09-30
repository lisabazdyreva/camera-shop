import {ProductCard} from '../../../../common/common';
import {Camera} from '../../../../../types/types';
import useSlider from '../../../../../hooks/product-hooks/useSlider';

const CARDS_PER_STEP = 3;

interface SliderProps {
  similarCameras: Camera[];
}

const Slider = ({similarCameras}: SliderProps) => {
  const { items, handlePreviousClick, handleNextClick, disabling } = useSlider(similarCameras, CARDS_PER_STEP);

  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {
          items.map((similarCamera, index) => (
            <ProductCard
              //TODO
              //eslint-disable-next-line
              handleAddModal={() => console.log('f')}
              data={similarCamera}
              key={similarCamera.id}
              additionalClass={'is-active'}
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
    </div>
  );
};

export default Slider;
