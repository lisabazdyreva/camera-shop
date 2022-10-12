import './product-item.css';

import {useState} from 'react';

import {Picture, Rating} from '../../../../common/common';
import {ProductTabs} from '../components';

import {Camera} from '../../../../../types/camera';
import {RatingClass} from '../../../../../utils/const';
import {getFormattedPrice} from '../../../../../utils/utils';
import {useAppDispatch} from '../../../../../hooks';

import {setBasket} from '../../../../../store/process/process';


interface ProductItemProps {
  data: Camera;
}

const ProductItem = ({data}: ProductItemProps):JSX.Element => {
  const dispatch = useAppDispatch();
  const [, setIsAddedBasket] = useState('Not added to basket');// TODO next iteration

  const {
    name, previewImg,
    previewImg2x, previewImgWebp,
    previewImgWebp2x, rating,
    reviewCount, id,
    price, vendorCode,
    category, type,
    level, description
  } = data;

  const formattedPrice = getFormattedPrice(price);

  const handleButtonAddToBasketClick = () => {
    dispatch(setBasket(data));
    setIsAddedBasket('Added to basket');
  };

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <Picture
            width={560}
            height={480}
            alt={name}
            src={`/${previewImg}`}
            srcSetImg={`/${previewImg2x}`}
            srcSetSource={[`/${previewImgWebp}`, `/${previewImgWebp2x}`]}
          />
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{name}</h1>
          <Rating additionalClass={RatingClass.Product} rating={rating} reviewCount={reviewCount} id={id} isDetailed />
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>
            {formattedPrice}
          </p>
          <button className="btn btn--purple" type="button" onClick={handleButtonAddToBasketClick}>
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>
            Добавить в корзину
          </button>
          <ProductTabs data={{vendorCode, category, type, level, description}}/>
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
