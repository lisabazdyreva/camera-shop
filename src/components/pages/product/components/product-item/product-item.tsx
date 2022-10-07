import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Picture, Rating} from '../../../../common/common';
import {ProductTabs} from '../components';

import {Camera} from '../../../../../types/camera';
import {RatingClass} from '../../../../../utils/const';
import {getFormattedPrice} from '../../../../../utils/utils';

import {setBasket} from '../../../../../store/app-process/app-process';

interface ProductItemProps {
  data: Camera;
}

const ProductItem = ({data}: ProductItemProps):JSX.Element => {
  const dispatch = useDispatch();
  const [isAddedBasket, setIsAddedBasket] = useState('Not added to basket');// TODO next iteration

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
    setIsAddedBasket('Added to basket');
  };

  const formattedPrice = getFormattedPrice(price);

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
