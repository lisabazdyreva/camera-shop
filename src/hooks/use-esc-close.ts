import {useEffect} from 'react';
import {isEsc} from '../utils/utils';


export const useEscClose = (onModalClose: () => void) => {
  useEffect(() => {
    const handleEscapeKeyPress = (evt: KeyboardEvent) => {
      if (isEsc(evt.code)) {
        onModalClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [onModalClose]);
};
