import './basket-quantity.css';

import {ChangeEvent} from 'react';

import {CamerasAmount} from '../../../../../utils/const';
import {useAppDispatch} from '../../../../../hooks';
import {Camera} from '../../../../../types/camera';

import {removeBasketItem, setBasketItem, setBasketItems} from '../../../../../store/order/order';


interface BasketQuantityProps {
  camera: Camera;
  cameraAmount: number | string;
  onCameraAmountChange: (amount: number | string) => void;
}


const BasketQuantity = ({camera, cameraAmount, onCameraAmountChange}: BasketQuantityProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const iconArrow = <svg width="7" height="12" aria-hidden="true"><use xlinkHref="#icon-arrow"></use></svg>;

  const isMinimum = cameraAmount === CamerasAmount.Min;
  const isMaximum = cameraAmount === CamerasAmount.Max;

  const handleCameraAmountInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === '') {
      onCameraAmountChange('');
      return;
    }
    onCameraAmountChange(Number(evt.target.value));
  };

  const handleCameraAmountInputBlur = () => {
    if (cameraAmount < CamerasAmount.Min) {
      onCameraAmountChange(Number(CamerasAmount.Min));
      dispatch(setBasketItems({id: camera.id, amount: CamerasAmount.Min}));
      return;
    }

    if (cameraAmount > CamerasAmount.Max) {
      onCameraAmountChange(Number(CamerasAmount.Max));
      dispatch(setBasketItems({id: camera.id, amount: CamerasAmount.Max}));
      return;
    }
    onCameraAmountChange(Number(cameraAmount));
    dispatch(setBasketItems({id: camera.id, amount: Number(cameraAmount)}));
  };

  const handleDecreaseAmountButtonClick = () => {
    dispatch(removeBasketItem(camera.id));
    onCameraAmountChange(Number(cameraAmount) - 1);
  };

  const handleIncreaseAmountButtonClick = () => {
    dispatch(setBasketItem(camera));
    onCameraAmountChange(Number(cameraAmount) + 1);
  };

  return (
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
        disabled={isMinimum}
        onClick={handleDecreaseAmountButtonClick}
      >
        {iconArrow}
      </button>
      <label className="visually-hidden" htmlFor="counter1"></label>
      <input
        type="number"
        id="counter1"
        min="1"
        max="99"
        aria-label="количество товара"
        data-testid='cameras-amount'
        value={cameraAmount}
        onChange={handleCameraAmountInputChange}
        onBlur={handleCameraAmountInputBlur}
      />
      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
        disabled={isMaximum}
        onClick={handleIncreaseAmountButtonClick}
      >
        {iconArrow}
      </button>
    </div>
  );
};

export default BasketQuantity;
