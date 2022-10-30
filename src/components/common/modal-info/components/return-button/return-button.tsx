import {useNavigate} from 'react-router-dom';

import {ModalInfoNameType} from '../../../../../types/types';
import {AppRoute, DefaultValue, ModalInfoName} from '../../../../../utils/const';


interface ReturnButtonProps {
  handleCloseSuccessModal?: (isOpen: boolean) => void;
  modalInfoType?: ModalInfoNameType,
}

const ReturnButton = ({handleCloseSuccessModal, modalInfoType}: ReturnButtonProps):JSX.Element => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (handleCloseSuccessModal) {
      handleCloseSuccessModal(false);
    }

    if (modalInfoType === ModalInfoName.ReviewPost) {
      return;
    }

    navigate(`${AppRoute.Catalog}${AppRoute.Page}${DefaultValue.CatalogPageNumber}`);
  };

  return (
    <button onClick={handleButtonClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам</button>
  );
};

export default ReturnButton;
