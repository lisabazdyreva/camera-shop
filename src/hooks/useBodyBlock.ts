import {useEffect} from 'react';
import {createFocusTrap} from 'focus-trap';
import {TopCoordinate} from '../utils/const';

export const useBodyBlock = () => {
  useEffect(() => {
    const focusModalTrap = createFocusTrap('.modal', {tabbableOptions: {displayCheck: 'none'}});

    document.body.dataset.scrollY = String((document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop));
    document.body.style.top = `-${document.body.dataset.scrollY}px`;
    document.body.classList.add('scroll-lock-ios');

    focusModalTrap.activate();

    window.scrollTo(TopCoordinate.X, TopCoordinate.Y);

    return () => {
      document.body.classList.remove('scroll-lock-ios');
      focusModalTrap.deactivate();
      window.scrollTo(TopCoordinate.X, Number(document.body.dataset.scrollY));
    };
  }, []);
};
