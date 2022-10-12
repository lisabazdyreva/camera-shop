import './modal-info.css';

import {CatalogButtons, IconReview, IconSuccess, ReturnButton} from './components/components';

import {getTitle} from '../../../utils/utils';
import {ComponentName, LoadingStatus, ModalContent} from '../../../utils/const';

import {ComponentNameType} from '../../../types/types';

import {getReviewPostStatus} from '../../../store/reviews/selectors';
import {useBodyBlock} from '../../../hooks/use-body-block';
import {useAppSelector} from '../../../hooks';
import {useEscClose} from '../../../hooks/use-esc-close';
import {SyntheticEvent} from 'react';

interface ModalInfoProps {
  usingComponent: ComponentNameType;
  onModalClose: () => void;
}

const ModalInfo = ({usingComponent, onModalClose}: ModalInfoProps):JSX.Element => {
  const reviewPostStatus = useAppSelector(getReviewPostStatus);

  const title = usingComponent === ComponentName.Product
    ? getTitle(usingComponent, ModalContent.Info, reviewPostStatus === LoadingStatus.Error)
    : getTitle(usingComponent, ModalContent.Info);

  const getSVG = () => {
    if (usingComponent === ComponentName.Catalog) {
      return <IconSuccess/>;
    }
    return <IconReview status={reviewPostStatus}/>;
  };

  const getButtons = () => {
    if (usingComponent === ComponentName.Basket) {
      return <ReturnButton />;
    }

    if (usingComponent === ComponentName.Catalog) {
      return <CatalogButtons handleCloseSuccessModal={onModalClose}/>;
    }

    if (usingComponent === ComponentName.Product) {
      return <ReturnButton handleCloseSuccessModal={onModalClose}/>;
    }
  };

  const modalSvg = getSVG();
  const modalButtons = getButtons();

  const handleOutsideModalClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
  };

  useEscClose(onModalClose);
  useBodyBlock();

  return (
    <div className="modal is-active modal--narrow" onClick={onModalClose} data-testid='modal-info'>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={handleOutsideModalClick}>
          <p className="title title--h4">{title}</p>
          {modalSvg}
          <div className="modal__buttons">
            {modalButtons}
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onModalClose}>
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
