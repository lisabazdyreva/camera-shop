import {LegacyRef, useRef} from 'react';

const useFocus = (): [LegacyRef<HTMLInputElement>, () => void] => {
  const htmlElementRef = useRef<null | HTMLInputElement>(null);

  const setFocus = () => {
    htmlElementRef?.current?.focus?.();
  };

  return [htmlElementRef, setFocus];
};

export {useFocus};
