import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../../../../utils/const';

interface CatalogButtonsProps {
  handleCloseSuccessModal: (isOpen: boolean) => void;
}

const CatalogButtons = ({handleCloseSuccessModal}: CatalogButtonsProps):JSX.Element => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    handleCloseSuccessModal(false);
    navigate(AppRoute.Basket);

  };

  const handleCloseClick = () => {
    handleCloseSuccessModal(false);
  };

  return (
    <>
      <a className="btn btn--transparent modal__btn" onClick={handleCloseClick}>Продолжить покупки</a>
      <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleButtonClick}>Перейти в корзину</button>
    </>
  );
};

export default CatalogButtons;
