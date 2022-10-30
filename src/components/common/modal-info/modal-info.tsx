import './modal-info.css';

import {SyntheticEvent} from 'react';

import {CatalogButtons, IconThumb, IconSuccess, ReturnButton} from './components/components';
import {LoadingStatus, ModalInfoName, ModalMessage} from '../../../utils/const';
import {ModalInfoNameType} from '../../../types/types';

import {useBodyBlock} from '../../../hooks/use-body-block';
import {useEscClose} from '../../../hooks/use-esc-close';
import {useAppSelector} from '../../../hooks';

import {getReviewPostStatus} from '../../../store/reviews/selectors';
import {getOrderPostStatus} from '../../../store/order/selectors';


interface ModalInfoProps {
  onInfoModalClose: () => void;
  modalInfoType: ModalInfoNameType,
}


const ModalInfo = ({onInfoModalClose, modalInfoType}: ModalInfoProps):JSX.Element => {
  const reviewPostStatus = useAppSelector(getReviewPostStatus);
  const postOrderPostStatus = useAppSelector(getOrderPostStatus);

  const setTitle = () => {
    switch (modalInfoType) {
      case ModalInfoName.ReviewPost: {
        return reviewPostStatus === LoadingStatus.Error ? ModalMessage.ProductError : ModalMessage.ProductSuccess;
      }
      case ModalInfoName.OrderPost: {
        return postOrderPostStatus === LoadingStatus.Error ? ModalMessage.BasketError : ModalMessage.BasketSuccess;
      }
      case ModalInfoName.AddedToBasket:
        return ModalMessage.CatalogSuccess;
    }
  };

  const title = setTitle();
  const getSVG = () => {
    switch (modalInfoType) {
      case ModalInfoName.AddedToBasket:
        return <IconSuccess />;
      case ModalInfoName.OrderPost:
        return <IconThumb status={postOrderPostStatus}/>;
      case ModalInfoName.ReviewPost:
        return <IconThumb status={reviewPostStatus}/>;
    }
  };

  const getButtons = () => {
    if (modalInfoType === ModalInfoName.AddedToBasket) {
      return <CatalogButtons handleCloseSuccessModal={onInfoModalClose}/>;
    }

    return <ReturnButton handleCloseSuccessModal={onInfoModalClose} modalInfoType={modalInfoType}/>;
  };

  const modalSvg = getSVG();
  const modalButtons = getButtons();

  const handleOutsideModalClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
  };

  useEscClose(onInfoModalClose);
  useBodyBlock();

  return (
    <div className="modal is-active modal--narrow" onClick={onInfoModalClose} data-testid='modal-info'>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={handleOutsideModalClick}>
          <p className="title title--h4">{title}</p>
          {modalSvg}
          <div className="modal__buttons">
            {modalButtons}
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onInfoModalClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
