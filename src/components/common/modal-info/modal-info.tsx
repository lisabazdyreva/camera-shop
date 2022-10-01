import {getTitle} from '../../../utils/utils';
import {ComponentName, ComponentNameType} from '../../../utils/const';
import {
  CatalogButtons,
  IconReviewSuccess,
  IconSuccess,
  ReturnButton
} from './components/components';
import {ModalContent} from '../../../utils/const';

interface ModalInfoProps {
  usingComponent: ComponentNameType;
  handleCloseModal: (isOpen: boolean) => void;
}
const ModalInfo = ({usingComponent, handleCloseModal}: ModalInfoProps) => {
  const title = getTitle(usingComponent, ModalContent.Info);

  const getSVG = () => {
    if (usingComponent === ComponentName.Catalog) {
      return <IconSuccess/>;
    }
    return <IconReviewSuccess />;
  };

  const getButtons = () => {
    if (usingComponent === ComponentName.Basket) {
      return <ReturnButton />;
    } else if (usingComponent === ComponentName.Catalog) {
      return <CatalogButtons handleCloseSuccessModal={handleCloseModal}/>;
    } else if (usingComponent === ComponentName.Product) {
      return <ReturnButton handleCloseSuccessModal={handleCloseModal}/>;
    }
  };

  const modalSvg = getSVG();
  const modalButtons = getButtons();

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">{title}</p>
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

export default ModalInfo;
