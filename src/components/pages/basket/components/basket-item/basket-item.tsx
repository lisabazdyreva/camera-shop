import './basket-item.css';

import {useState} from 'react';

import {Picture} from '../../../../common/common';
import {BasketQuantity} from '../components';

import {Camera} from '../../../../../types/camera';
import {getFormattedPrice} from '../../../../../utils/utils';
import {useAppSelector} from '../../../../../hooks';

import {getBasket} from '../../../../../store/order/selectors';


interface BasketItemProps {
  onCameraRemoveModalOpen: (id: number) => void;
  camera: Camera;
}

const BasketItem = ({onCameraRemoveModalOpen, camera}: BasketItemProps):JSX.Element => {
  const {name, vendorCode, category, type, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;
  const formattedPrice = getFormattedPrice(price);

  const cameras = useAppSelector(getBasket);
  const sameCamerasAmount = cameras.filter((item) => item.id === camera.id).length;

  const [cameraAmount, setCameraAmount] = useState<string | number>(sameCamerasAmount);

  const totalFormattedPrice = getFormattedPrice(Number(cameraAmount) * price);

  const handleRemoveCamerasButtonClick = () => {
    onCameraRemoveModalOpen(camera.id);
  };

  const handleCameraAmountChange = (amount: number | string) => {
    setCameraAmount(amount);
  };

  return (
    <li className="basket-item" data-testid='basket-item'>
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
      <BasketQuantity camera={camera} cameraAmount={cameraAmount} onCameraAmountChange={handleCameraAmountChange}/>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{totalFormattedPrice}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleRemoveCamerasButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};


export default BasketItem;
