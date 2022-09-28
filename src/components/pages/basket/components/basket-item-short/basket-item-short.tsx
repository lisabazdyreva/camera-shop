import {Camera} from '../../../../../types/types';

interface BasketItemShortProps {
  data: Camera;
}

const BasketItemShort = ({data}: BasketItemShortProps) => {
  const {name, price, previewImg, previewImgWebp, previewImgWebp2x, previewImg2x, level, category, vendorCode} = data;

  return (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width="140"
            height="120"
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p> {/*TODO format Фотоаппарат «Орлёнок»*/}
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number"> {vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p> {/*TODO format 18 970*/}
      </div>
    </div>
  );
};

export default BasketItemShort;
