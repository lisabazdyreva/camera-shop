import './product-card.css';

import {Link} from 'react-router-dom';

import {Picture, Rating} from '../common';
import {Camera} from '../../../types/camera';

import {
  ACTIVE_CLASS,
  AppRoute,
  BasketButtonText,
  RatingClass,
  TabType
} from '../../../utils/const';
import {getFormattedPrice} from '../../../utils/utils';
import {useAppSelector} from '../../../hooks';
import {getBasket} from '../../../store/order/selectors';

interface ProductCardProps {
  handleAddModal: (data: Camera) => void;
  data: Camera;
  additionalClass?: typeof ACTIVE_CLASS;
}

const ButtonClass = {
  Purple: 'btn--purple',
  White: 'product-card__btn--in-cart btn--purple-border',
} as const;

const ProductCard = ({handleAddModal, data, additionalClass}: ProductCardProps) :JSX.Element => {
  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, id, reviewCount, rating} = data;
  const formattedPrice = getFormattedPrice(price);

  const basket = useAppSelector(getBasket);
  const isAlreadyInBasket = basket.some((camera) => camera.name === name);

  const buttonText = isAlreadyInBasket ? BasketButtonText.InBasket : BasketButtonText.Buy;
  const buttonClasses = isAlreadyInBasket ? ButtonClass.White : ButtonClass.Purple;

  const handleAddToBasketButtonClick = () => {
    handleAddModal(data);
  };

  return (
    <div className={`product-card ${additionalClass}`} data-testid='card'>
      <div className="product-card__img">
        <Picture
          width={280}
          height={240}
          alt={name}
          src={`/${previewImg}`}
          srcSetImg={`/${previewImg2x}`}
          srcSetSource={[`/${previewImgWebp}`, `/${previewImgWebp2x}`]}
        />
      </div>
      <div className="product-card__info">
        <Rating additionalClass={RatingClass.Catalog} rating={rating} reviewCount={reviewCount} id={id} isDetailed/>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formattedPrice}</p>
      </div>
      <div className="product-card__buttons">
        <button className={`btn product-card__btn ${buttonClasses}`} type="button" onClick={handleAddToBasketButtonClick}>
          {buttonText}
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}/${TabType.Features}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default ProductCard;
