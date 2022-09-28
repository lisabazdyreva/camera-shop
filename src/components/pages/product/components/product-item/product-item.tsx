import {Camera} from '../../../../../types/types';
import {Rating} from '../../../../common/common';

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
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button className="tabs__control" type="button">Характеристики</button>
              <button className="tabs__control is-active" type="button">Описание</button>
            </div>
            <div className="tabs__content">
              <div className="tabs__element">
                <ul className="product__tabs-list">
                  <li className="item-list"><span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> {vendorCode}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{category}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{type}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{level}</p>
                  </li>
                </ul>
              </div>
              <div className="tabs__element is-active">
                <div className="product__tabs-text">
                  {description}
                  {/*<p>*/}
                  {/*  Немецкий концерн BRW разработал видеокамеру Das Auge IV в&nbsp;начале 80-х годов, однако*/}
                  {/*  она до&nbsp;сих пор пользуется популярностью среди коллекционеров и&nbsp;яростных*/}
                  {/*  почитателей старинной техники.*/}
                  {/*</p>*/}
                  {/*<p>*/}
                  {/*  Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству аналоговой съёмки, заказав этот*/}
                  {/*  чудо-аппарат. Кто знает, может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь к&nbsp;наградам*/}
                  {/*  всех престижных кинофестивалей.*/}
                  {/*</p>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
