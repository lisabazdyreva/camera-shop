interface RatingProductCardProps {
  rating: number,
  reviewCount?: number,
  id: number | string,
  isCatalogRating?: boolean,
  isReviewCard?: boolean,
}

const MAX_RATING = 5;
//TODO to common
const RatingProductCard = ({rating, reviewCount, id, isCatalogRating, isReviewCard}: RatingProductCardProps) => {
  const elements = new Array(MAX_RATING).fill('');// TODO how to render without map
  return (
    <div className={`rate ${isCatalogRating ? 'product-card__rate' : 'product__rate'} ${isReviewCard ? 'review-card__rate' : ''}`} >
      {/*TODO change key*/}
      {
        //eslint-disable-next-line
        elements.map((element, index) => {
          return (
            //eslint-disable-next-line
            <svg key={`${reviewCount}_${id}_${index}`} width="17" height="16" aria-hidden="true">
              <use xlinkHref={rating > index ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
          );
        })
      }
      <p className="visually-hidden">Рейтинг: {rating}</p>
      {!isReviewCard && <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>}
    </div>
  );
};

export default RatingProductCard;
