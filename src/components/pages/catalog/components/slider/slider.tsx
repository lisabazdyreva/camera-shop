import {ProductCard} from '../components';
import {Camera} from '../../../../../types/types';
import {useState} from 'react';

const CARDS_PER_STEP = 3;

interface SliderProps {
  similarCameras: Camera[];
}
//eslint-disable-next-line
const Slider = ({similarCameras}: SliderProps) => {
  //TODO возможно выделить в хук
  const [counter, setCount] = useState(0);
  const handlePreviousButtonClick = () => {
    setCount(counter - 1);
  };

  const handleNextButtonClick = () => {

    setCount(counter + 1);
  };

  const cameras = similarCameras.slice(counter, counter + CARDS_PER_STEP);

  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {
          cameras.map((similarCamera, index) => (
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
        onClick={handlePreviousButtonClick}
        disabled={counter === 0}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
        onClick={handleNextButtonClick}
        disabled={cameras.length < 3}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
};

export default Slider;
