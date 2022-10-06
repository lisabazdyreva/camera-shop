import {createFocusTrap} from 'focus-trap';

export const blockBody = () => {
  const focusModalTrap = createFocusTrap('.modal');
  document.body.dataset.scrollY = String((document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop));
  document.body.style.top = `-${document.body.dataset.scrollY}px`;
  document.body.classList.add('scroll-lock-ios');

  focusModalTrap.activate();

  window.scrollTo(0, 0);

  return () => {
    document.body.classList.remove('scroll-lock-ios');
    focusModalTrap.deactivate();
    window.scrollTo(0, Number(document.body.dataset.scrollY));
  };
};
