import {useDispatch} from 'react-redux';
import {Camera} from '../../../../../types/camera';
import {setBasket} from '../../../../../store/app-process/app-process';

interface BasketAddButtonProps {
  data?: Camera;
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
}

const BasketAddButton = ({data, handleOpenSuccessModal, handleCloseModal}: BasketAddButtonProps):JSX.Element => {
  const dispatch = useDispatch();

  const handleButtonAddClick = () => {
    if (data && handleOpenSuccessModal) {
      dispatch(setBasket(data));
      handleCloseModal(false);
      handleOpenSuccessModal(true);
    }
  };

  return (
    <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonAddClick}>
      <svg width="24" height="16" aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>
  );
};

export default BasketAddButton;
