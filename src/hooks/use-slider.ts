import {useState} from 'react';
import {Cameras} from '../types/camera';

const useSlider = (items: Cameras, step: number) => {
  const [counter, setCount] = useState(0);

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

