import {useEffect, useState} from 'react';
import {DEBOUNCE_DELAY} from '../utils/const';

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), DEBOUNCE_DELAY);
    return () => {
      clearTimeout(timer);
    };

  }, [value]);

  return debouncedValue;
};

export {useDebounce};
