import {Camera} from '../../../../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../../../types/const';
import {RatingProductCard} from '../components';


interface ProductCardProps {
  handleAddModal: (data: Camera) => void;
  data: Camera;
  additionalClass?: 'is-active' | null;
}
//eslint-disable-next-line
const ProductCard = ({handleAddModal, data, additionalClass}: ProductCardProps) => {
  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, id, reviewCount, rating, level, vendorCode, category} = data;
  //{TODO for slider for three first add class is-active:  product-card is-active}
  //{TODO component to common}
  return (
    <div className={`product-card ${additionalClass || ''}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`} /> {/*"img/content/img1.webp, img/content/img1@2x.webp 2x"*/}
          {/*TODO quotes Ретрокамера «Das Auge IV»*/}
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
        <RatingProductCard rating={rating} reviewCount={reviewCount} id={id} isCatalogRating/>

        <p className="product-card__title">{name}</p>{/*TODO quotes Ретрокамера «Das Auge IV»*/}
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽ {/*TODO format 73 450*/}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => handleAddModal(data)}>Купить</button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default ProductCard;
