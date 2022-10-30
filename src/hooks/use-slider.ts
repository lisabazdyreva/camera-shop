import {useState} from 'react';
import {Cameras} from '../types/camera';
import {Step} from '../utils/const';

const useSlider = (items: Cameras) => {
  const [counter, setCount] = useState(0);
  const step = Step.Slider;

  const handlePreviousClick = () => {
    setCount(counter - 1);
  };

  const handleNextClick = () => {
    setCount(counter + 1);
  };

  const slicedItems = items.slice(counter, counter + step);
  const isFirst = counter === 0;
  const isLast = slicedItems.length < step;

  return {
    items: slicedItems,
    handlePreviousClick: handlePreviousClick,
    handleNextClick: handleNextClick,
    disabling: {
      isFirst,
      isLast,
    }
  };
};

export default useSlider;

