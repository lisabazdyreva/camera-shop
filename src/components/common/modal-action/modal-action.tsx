import {ReviewForm} from '../../pages/product/components/components';
import {BasketItemShort} from '../../pages/basket/components/components';
import {BasketAddButton, BasketRemoveButtons} from './components/components';

import {getTitle} from '../../../utils/utils';
import {ComponentName, ModalContent} from '../../../utils/const';
import {useBodyBlock} from '../../../hooks/use-body-block';
import {useAppDispatch} from '../../../hooks';

import {ComponentNameType} from '../../../types/types';
import {Camera} from '../../../types/camera';

import {cleanForm} from '../../../store/process/process';
import {useEscClose} from '../../../hooks/use-esc-close';
import {SyntheticEvent} from 'react';


interface ModalActionProps {
  usingComponent: ComponentNameType;
  data? : Camera;
  onModalClose: () => void;
  onSuccessModalOpen?: () => void;
}

const ModalAction = ({usingComponent, data, onModalClose, onSuccessModalOpen}: ModalActionProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const getDetails = () => {
    if (usingComponent === ComponentName.Product && data && onSuccessModalOpen) {
      return <ReviewForm id={data.id} onModalClose={onModalClose} onSuccessModalOpen={onSuccessModalOpen}/>;
    }

    if (data) {
      return <BasketItemShort data={data}/>;
    }
  };

  const getButtons = () => {
    if (usingComponent === ComponentName.Basket) {
      return <BasketRemoveButtons />;
    }

    if (usingComponent === ComponentName.Catalog) {
      return <BasketAddButton data={data} handleCloseModal={onModalClose} handleOpenSuccessModal={onSuccessModalOpen}/>;
    }
  };

  const title = getTitle(usingComponent, ModalContent.Action);
  const modalDetails = getDetails();
  const modalButtons = getButtons();

  const handleModalClose = () => {
    if (usingComponent === ComponentName.Product) {
      dispatch(cleanForm());
    }
    onModalClose();
  };

  const handleOutsideModalClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
  };

  useEscClose(onModalClose);
  useBodyBlock();

  return (
    <div className="modal is-active" data-testid='modal-action'>
      <div className="modal__wrapper" onClick={handleModalClose}>
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={handleOutsideModalClick}>
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
