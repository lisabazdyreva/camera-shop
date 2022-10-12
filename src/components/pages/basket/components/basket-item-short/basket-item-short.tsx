import '../basket-item/basket-item.css';
import './basket-item-short.css';

import {Camera} from '../../../../../types/camera';
import {getFormattedPrice} from '../../../../../utils/utils';
import {Picture} from '../../../../common/common';

interface BasketItemShortProps {
  data: Camera;
}

const BasketItemShort = ({data}: BasketItemShortProps):JSX.Element => {
  const {name, price, previewImg, previewImgWebp, previewImgWebp2x, previewImg2x, level, category, vendorCode} = data;
  const formattedPrice = getFormattedPrice(price);

  return (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <Picture
          width={140}
          height={120}
          alt={name}
          src={`/${previewImg}`}
          srcSetImg={`/${previewImg2x}`}
          srcSetSource={[`/${previewImgWebp}`, `/${previewImgWebp2x}`]}
        />
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number"> {vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formattedPrice}</p>
      </div>
    </div>
  );
};

export default BasketItemShort;
