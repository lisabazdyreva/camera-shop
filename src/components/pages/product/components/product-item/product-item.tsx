import {Camera} from '../../../../../types/types';
import {Rating} from '../../../../common/common';
import {ProductTabs} from '../components';

interface ProductItemProps {
  data: Camera;
}


const ProductItem = ({data}: ProductItemProps) => {
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


  const handleButtonClick = () => {
    //eslint-disable-next-line
    console.log('added');
  };

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
          <h1 className="title title--h3">{name}</h1>{/*TODO Format Ретрокамера «Das Auge IV»*/}
          <Rating rating={rating} reviewCount={reviewCount} id={id} isCatalogRating={false} />
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>
            {price} ₽{/*TODO Format 73 450*/}
          </p>
          <button className="btn btn--purple" type="button" onClick={handleButtonClick}>
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
