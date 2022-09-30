import {Camera} from '../../../../../types/types';
import {Rating} from '../../../../common/common';
import {ProductTabs} from '../components';
import {getFormattedPrice} from '../../../../../utils/utils';
import {useDispatch} from 'react-redux';
import {setBasket} from '../../../../../store/actions/actions';
import {useState} from 'react';


interface ProductItemProps {
  data: Camera;
}

const ProductItem = ({data}: ProductItemProps) => {
  const dispatch = useDispatch();
  const [isAddedBasket, setIsAddedBasket] = useState('Not Added'); // TODO добавить модальное
  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    rating,
    reviewCount,
    id,
    price,
    vendorCode,
    category,
    type,
    level,
    description
  } = data;


  const handleButtonAddClick = () => {
    dispatch(setBasket(data));
    setIsAddedBasket('Added');
  };

  const formattedPrice = getFormattedPrice(price);

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}  2x`} />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x} 2x`}
              width="560"
              height="480"
              alt={name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{name}</h1>
          <Rating rating={rating} reviewCount={reviewCount} id={id} isCatalogRating={false} />
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>
            {formattedPrice}
          </p>
          <button className="btn btn--purple" type="button" onClick={handleButtonAddClick}>
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>
            Добавить в корзину
          </button>
          {isAddedBasket}
          <ProductTabs data={{vendorCode, category, type, level, description}}/>
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
