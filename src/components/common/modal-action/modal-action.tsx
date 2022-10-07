import {useEffect} from 'react';
import {createFocusTrap} from 'focus-trap';

import {ReviewForm} from '../../pages/product/components/components';
import {BasketItemShort} from '../../pages/basket/components/components';
import {BasketAddButton, BasketRemoveButtons} from './components/components';

import {escPressHandler, getTitle} from '../../../utils/utils';
import {ComponentName, ModalContent, TopCoordinate} from '../../../utils/const';
import {ComponentNameType} from '../../../types/types';
import {Camera} from '../../../types/camera';
import {cleanForm} from '../../../store/app-process/app-process';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../types/state';

// import {blockBody} from '../../../utils/modal-blocking-body';


interface ModalActionProps {
  usingComponent: ComponentNameType;
  data? : Camera;
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
}

const ModalAction = ({usingComponent, data, handleCloseModal, handleOpenSuccessModal}: ModalActionProps):JSX.Element => {
  const dispatch = useDispatch<AppDispatch>(); //TODO useAppDispatch
  const getDetails = () => {
    if (usingComponent === ComponentName.Product && data) {
      return <ReviewForm id={data.id} handleCloseModal={handleCloseModal} handleOpenSuccessModal={handleOpenSuccessModal}/>;
    }

    if (data) {
      return <BasketItemShort data={data}/>;
    }
  };

  const getButtons = () => {
    if (usingComponent === ComponentName.Basket) {
      return <BasketRemoveButtons />;
    } else if (usingComponent === ComponentName.Catalog) {
      return <BasketAddButton data={data} handleCloseModal={handleCloseModal} handleOpenSuccessModal={handleOpenSuccessModal}/>;
    }
  };

  const title = getTitle(usingComponent, ModalContent.Action);
  const modalDetails = getDetails();
  const modalButtons = getButtons();

  useEffect(() => {
    if (usingComponent === ComponentName.Product) {
      dispatch(cleanForm());
    }

    escPressHandler(handleCloseModal);
  }, [handleCloseModal]);

  // TODO ??
  useEffect(() => {
    const focusModalTrap = createFocusTrap('.modal');
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

  const handleModalClose = () => {
    if (usingComponent === ComponentName.Product) {
      dispatch(cleanForm());
    }
    handleCloseModal(false)
  };

  return (
    <div className="modal is-active" data-testid='modal-action'>
      <div className="modal__wrapper" onClick={handleModalClose}>
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => evt.stopPropagation()}>
          <p className="title title--h4">{title}</p>
          {modalDetails}
          <div className="modal__buttons">
            {modalButtons}
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAction;
