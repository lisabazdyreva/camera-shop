import './basket-item.css';

import {Picture} from '../../../../common/common';
import {Camera} from '../../../../../types/camera';
import {getFormattedPrice} from '../../../../../utils/utils';
import {ChangeEvent, useState} from 'react';

interface BasketItemProps {
  onModalOpen: () => void;
  camera: Camera;
}

const BasketItem = ({onModalOpen, camera}: BasketItemProps):JSX.Element => {
  const {name, vendorCode, category, type, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;
  const formattedPrice = getFormattedPrice(price);

  const [cameraAmount, setCameraAmount] = useState(1);

  const handleCameraAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCameraAmount(Number(evt.target.value));
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
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
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
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>37 940 ₽
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={onModalOpen}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};


export default BasketItem;
