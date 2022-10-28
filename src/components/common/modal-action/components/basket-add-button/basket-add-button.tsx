import {Camera} from '../../../../../types/camera';
import {setBasketItem} from '../../../../../store/process/process';
import {useAppDispatch} from '../../../../../hooks';

interface BasketAddButtonProps {
  data?: Camera;
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
}

const BasketAddButton = ({data, handleOpenSuccessModal, handleCloseModal}: BasketAddButtonProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const handleButtonAddToBasketClick = () => {
    if (data && handleOpenSuccessModal) {
      dispatch(setBasketItem(data));
      handleCloseModal(false);
      handleOpenSuccessModal(true);
    }
  };

  return (
    <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonAddToBasketClick}>
      <svg width="24" height="16" aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>
  );
};

export default BasketAddButton;
