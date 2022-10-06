import {escPressHandler, getTitle} from '../../../utils/utils';
import {ComponentName, ComponentNameType, ModalContent} from '../../../utils/const';
import {ReviewForm} from '../../pages/product/components/components';
import {BasketItemShort} from '../../pages/basket/components/components';
import {Camera} from '../../../types/types';
import {BasketAddButton, BasketRemoveButtons} from './components/components';
import {useEffect} from 'react';

import {blockBody} from '../../../utils/modal-block-utils';

interface ModalActionProps {
  usingComponent: ComponentNameType;
  data? : Camera;
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
}

const ModalAction = ({usingComponent, data, handleCloseModal, handleOpenSuccessModal}: ModalActionProps) => {

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
    escPressHandler(handleCloseModal);
  }, [handleCloseModal]);

  useEffect(() => {
    blockBody();
  }, []);

  return (
    <div className="modal is-active" data-testid='modal-action'>
      <div className="modal__wrapper" onClick={() => handleCloseModal(false)}>
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => evt.stopPropagation()}>
          <p className="title title--h4">{title}</p>
          {modalDetails}
          <div className="modal__buttons">
            {modalButtons}
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => handleCloseModal(false)}>
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
