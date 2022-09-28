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

import {ModalType} from '../../../types/const';

interface ModalProps {
  modalType: typeof ModalType[keyof typeof ModalType];
  isModalDetailed: boolean;
  handleCloseModal: (isOpen: boolean) => void;
  data?: any,
}
//TODO any
const Modal = ({modalType, isModalDetailed, handleCloseModal, data}: ModalProps) => {

  const getSVG = () => {
    if (modalType === ModalType.Catalog) {
      return <IconSuccess/>;
    }
    return <IconReviewSuccess />;
  };

  const getButtons = () => {
    if (modalType === ModalType.Basket) {
      return isModalDetailed ? <BasketRemoveButtons /> : <ReturnButton />;
    } else if (modalType === ModalType.Catalog) {
      return isModalDetailed ? <BasketAddButton/> : <CatalogButtons />;
    } else if (modalType === ModalType.Product) {
      return isModalDetailed ? null : <ReturnButton />;
    }
  };

  const getDetails = () => {
    if (modalType === ModalType.Product) {
      return <ReviewForm />;
    }
    return <BasketItemShort data={data}/>;
  };

  const title = getTitle(modalType, isModalDetailed);
  const modalSvg = isModalDetailed ? null : getSVG();
  const modalButtons = getButtons();
  const modalDetails = isModalDetailed ? getDetails() : null;

  const modalClassnames = `modal is-active ${!isModalDetailed ? 'modal--narrow' : ''}`;

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
