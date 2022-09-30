import {Camera} from '../../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../utils/const';
import {Rating} from '../common';
import {TabType} from '../../../utils/const';
import {getFormattedPrice} from '../../../utils/utils';


interface ProductCardProps {
  handleAddModal: (data: Camera) => void;
  data: Camera;
  additionalClass?: 'is-active';
}

const ProductCard = ({handleAddModal, data, additionalClass}: ProductCardProps) => {
  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, id, reviewCount, rating} = data;
  //{TODO for slider for three first add class is-active:  product-card is-active}
  const formattedPrice = getFormattedPrice(price);

  return (
    <div className={`product-card ${additionalClass}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width="280"
            height="240"
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <Rating rating={rating} reviewCount={reviewCount} id={id} isCatalogRating/>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formattedPrice}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => handleAddModal(data)}>Купить</button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}/${ TabType.Features}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default ProductCard;
