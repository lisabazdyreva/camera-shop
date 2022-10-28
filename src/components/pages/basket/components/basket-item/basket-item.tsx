import './basket-item.css';

import {ChangeEvent, useState} from 'react';

import {Picture} from '../../../../common/common';
import {Camera} from '../../../../../types/camera';
import {getFormattedPrice} from '../../../../../utils/utils';

import {useAppDispatch, useAppSelector} from '../../../../../hooks';
import {getBasket} from '../../../../../store/process/selectors';
import {removeBasketItem, setBasketItem, setBasketItems} from '../../../../../store/process/process';

interface BasketItemProps {
  onModalOpen: (id: number) => void;
  camera: Camera;
}

const BasketItem = ({onModalOpen, camera}: BasketItemProps):JSX.Element => {
  const {name, vendorCode, category, type, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;
  const formattedPrice = getFormattedPrice(price);
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getBasket);
  const similarCameras = cameras.filter((item) => item.id === camera.id);

  const count = similarCameras.length;
  const [cameraAmount, setCameraAmount] = useState(count);

  const totalPrice = cameraAmount * price;
  const totalFormattedPrice = getFormattedPrice(totalPrice);

  const handleCameraAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    //TODO валидация на больше - меньше
    dispatch(setBasketItems({id: camera.id, amount: Number(evt.target.value)}));
    setCameraAmount(Number(evt.target.value));
  };

  const handleDecreaseAmountButtonClick = () => {
    dispatch(removeBasketItem(camera.id));
    setCameraAmount(cameraAmount - 1);
  };

  const handleIncreaseAmountButtonClick = () => {
    dispatch(setBasketItem(camera));
    setCameraAmount(cameraAmount + 1);
  };

  const handleRemoveCamerasClick = () => {
    onModalOpen(camera.id);
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <Picture
          width={140}
          height={120}
          alt={name}
          src={previewImg}
          srcSetImg={previewImg2x}
          srcSetSource={[previewImgWebp, previewImgWebp2x]}
        />
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул: </span>
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} {category.toLowerCase()}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formattedPrice}</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={cameraAmount === 1}
          onClick={handleDecreaseAmountButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          min="1"
          max="99"
          aria-label="количество товара"
          value={cameraAmount}
          onChange={handleCameraAmountChange}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={cameraAmount === 99}
          onClick={handleIncreaseAmountButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{totalFormattedPrice} {/*TODO большая цена обрезается*/}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleRemoveCamerasClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};


export default BasketItem;
