import {removeBasketItems} from '../../../../../store/order/order';
import {useAppDispatch} from '../../../../../hooks';

interface BasketRemoveButtonsProps {
  id: number;
  handleCloseModal: () => void;
}
const BasketRemoveButtons = ({id, handleCloseModal}: BasketRemoveButtonsProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const handleRemoveButtonClicked = () => {
    dispatch(removeBasketItems(id));
    handleCloseModal();
  };

  return (
    <>
      <button
        className="btn btn--purple modal__btn modal__btn--half-width"
        type="button"
        onClick={handleRemoveButtonClicked}
      >
        Удалить
      </button>
      <button
        className="btn btn--transparent modal__btn modal__btn--half-width"
        onClick={handleCloseModal}
      >
        Продолжить покупки
      </button>
    </>);
};
export default BasketRemoveButtons;
