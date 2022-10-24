import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../../../../utils/const';

interface CatalogButtonsProps {
  handleCloseSuccessModal: (isOpen: boolean) => void;
}

const CatalogButtons = ({handleCloseSuccessModal}: CatalogButtonsProps):JSX.Element => {
  const navigate = useNavigate();

  const handleButtonToBasketClick = () => {
    handleCloseSuccessModal(false);
    navigate(AppRoute.Basket);

  };

  const handleButtonCloseClick = () => {
    handleCloseSuccessModal(false);
  };

  return (
    <>
      <button className="btn btn--transparent modal__btn" onClick={handleButtonCloseClick}>Продолжить покупки</button>
      <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleButtonToBasketClick}>Перейти в корзину</button>
    </>
  );
};

export default CatalogButtons;
