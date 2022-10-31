import {SyntheticEvent} from 'react';

import {ReviewForm} from '../../pages/product/components/components';
import {BasketItemShort} from '../../pages/basket/components/components';
import {BasketAddButton, BasketRemoveButtons} from './components/components';

import {ModalActionName, ModalMessage} from '../../../utils/const';
import {useBodyBlock} from '../../../hooks/use-body-block';
import {useAppDispatch} from '../../../hooks';

import {ModalActionNameType} from '../../../types/types';
import {Camera} from '../../../types/camera';

import {cleanForm} from '../../../store/process/process';
import {useEscClose} from '../../../hooks/use-esc-close';


interface ModalActionProps {
  data?: Camera;
  onActionModalClose: () => void;
  onInfoModalOpen?: () => void;
  modalActionType: ModalActionNameType,
}

const ModalAction = ({data, onActionModalClose, onInfoModalOpen, modalActionType}: ModalActionProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const getDetails = () => {
    if (modalActionType === ModalActionName.AddReview && data && onInfoModalOpen) {
      return <ReviewForm id={data.id} onModalClose={onActionModalClose} onSuccessModalOpen={onInfoModalOpen}/>;
    }

    if (data) {
      return <BasketItemShort data={data}/>;
    }
  };

  const getButtons = () => {
    if (modalActionType === ModalActionName.RemoveFromBasket && data) {
      return <BasketRemoveButtons id={data.id} handleCloseModal={onActionModalClose}/>;
    }

    if (modalActionType === ModalActionName.AddToBasket) {
      return <BasketAddButton data={data} handleCloseModal={onActionModalClose} handleOpenSuccessModal={onInfoModalOpen}/>;
    }
  };

  const getTitle = () => {
    switch (modalActionType) {
      case ModalActionName.RemoveFromBasket:
        return ModalMessage.BasketRemove;
      case ModalActionName.AddToBasket:
        return ModalMessage.CatalogAdd;
      case ModalActionName.AddReview:
        return ModalMessage.ProductReviewAdd;
    }
  };

  const title = getTitle();

  const modalDetails = getDetails();
  const modalButtons = getButtons();

  const handleModalClose = () => {
    if (modalActionType === ModalActionName.AddReview) {
      dispatch(cleanForm());
    }
    onActionModalClose();
  };

  const handleOutsideModalClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
  };

  useEscClose(onActionModalClose);
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
