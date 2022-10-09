import {useEffect} from 'react';

import {ReviewForm} from '../../pages/product/components/components';
import {BasketItemShort} from '../../pages/basket/components/components';
import {BasketAddButton, BasketRemoveButtons} from './components/components';

import {escPressHandler, getTitle} from '../../../utils/utils';
import {ComponentName, ModalContent} from '../../../utils/const';
import {useBodyBlock} from '../../../hooks/useBodyBlock';
import {useAppDispatch} from '../../../hooks';

import {ComponentNameType} from '../../../types/types';
import {Camera} from '../../../types/camera';

import {cleanForm} from '../../../store/app-process/app-process';


interface ModalActionProps {
  usingComponent: ComponentNameType;
  data? : Camera;
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
}

const ModalAction = ({usingComponent, data, handleCloseModal, handleOpenSuccessModal}: ModalActionProps):JSX.Element => {
  const dispatch = useAppDispatch();

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
  }, [handleCloseModal, dispatch, usingComponent]);


  useBodyBlock();

  const handleModalClose = () => {
    if (usingComponent === ComponentName.Product) {
      dispatch(cleanForm());
    }
    handleCloseModal(false);
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
