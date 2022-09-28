import {BasketItemShort} from '../../pages/basket/components/components';
import {ReviewForm} from '../../pages/product/components/components';
import {getTitle} from '../../../utils/utils';
import {
  BasketAddButton,
  BasketRemoveButtons, CatalogButtons,
  IconReviewSuccess,
  IconSuccess,
  ReturnButton
} from './components/components';

import {ComponentName, ComponentNameType, ModalType, ModalContent} from '../../../utils/const';
import {Camera} from '../../../types/types';

interface ModalProps {
  usingComponent: ComponentNameType;
  modalType: ModalType;
  handleCloseModal: (isOpen: boolean) => void;
  data?: Camera,
  handleOpenSuccessModal?: (isOpen: boolean) => void;
}

const Modal = ({usingComponent, modalType, handleCloseModal, handleOpenSuccessModal, data}: ModalProps) => {
  const isModalAction = modalType === ModalContent.Action;
  const getSVG = () => {
    if (usingComponent === ComponentName.Catalog) {
      return <IconSuccess/>;
    }
    return <IconReviewSuccess />;
  };

  const getButtons = () => {
    if (usingComponent === ComponentName.Basket) {
      return isModalAction ? <BasketRemoveButtons /> : <ReturnButton />;
    } else if (usingComponent === ComponentName.Catalog) {
      return isModalAction ? <BasketAddButton data={data} handleCloseModal={handleCloseModal} handleOpenSuccessModal={handleOpenSuccessModal}/> : <CatalogButtons handleCloseSuccessModal={handleCloseModal}/>;
    } else if (usingComponent === ComponentName.Product) {
      return isModalAction ? null : <ReturnButton />;
    }
  };

  const getDetails = () => {
    if (usingComponent === ComponentName.Product) {
      return <ReviewForm />;
    }

    if (data) {
      return <BasketItemShort data={data}/>;
    }
  };

  const title = getTitle(usingComponent, modalType);
  const modalSvg = isModalAction ? null : getSVG();
  const modalButtons = getButtons();
  const modalDetails = isModalAction ? getDetails() : null;

  const modalClassnames = `modal is-active ${!isModalAction ? 'modal--narrow' : ''}`;

  return (
    <div className={modalClassnames}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">{title}</p>
          {modalDetails}
          {modalSvg}
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

export default Modal;
