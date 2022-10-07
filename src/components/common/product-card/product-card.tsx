import {useState} from 'react';
import {Link} from 'react-router-dom';

import {Picture, Rating} from '../common';

import {Camera} from '../../../types/camera';

import {AppRoute, RatingClass, TabType} from '../../../utils/const';
import {getFormattedPrice} from '../../../utils/utils';

interface ProductCardProps {
  handleAddModal: (data: Camera) => void;
  data: Camera;
  additionalClass?: 'is-active';
  withoutBasketImplementation?: boolean;
}

const ProductCard = ({handleAddModal, data, additionalClass, withoutBasketImplementation}: ProductCardProps):JSX.Element => {
  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, id, reviewCount, rating} = data;
  const formattedPrice = getFormattedPrice(price);

  const [isAddedBasket, setIsAddedBasket] = useState('Not added to basket');// TODO next iteration

  const handleButtonAddClick = () => {
    handleAddModal(data);
    if (withoutBasketImplementation) {
      setIsAddedBasket('Added to basket');
    }
  };

  return (
    <div className={`product-card ${additionalClass}`} data-testid='card'>
      {withoutBasketImplementation && isAddedBasket}
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
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formattedPrice}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleButtonAddClick}>Купить</button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}/${TabType.Features}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default ProductCard;
