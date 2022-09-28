import {ratings} from '../../../utils/utils';

interface RatingProps {
  rating: number,
  reviewCount?: number,
  id: number | string,
  isCatalogRating?: boolean,
  isReviewCard?: boolean,
}
//TODO remove is booleans and change to const values

const RatingClasses = {
  Catalog: 'product-card__rate',
  Product: 'product__rate',
  Review: 'review-card__rate',
} as const;

const Rating = ({rating, reviewCount, id, isCatalogRating, isReviewCard} :RatingProps) => {
  const componentClasses = `rate ${isCatalogRating ? RatingClasses.Catalog : RatingClasses.Product} ${isReviewCard && RatingClasses.Review}`;
  return (
    <div className={componentClasses}>
      {
        ratings.map((ratingItem) => {
          const keyValue = `${reviewCount}_${id}_${ratingItem}`;
          const icon = rating >= ratingItem ? '#icon-full-star' : '#icon-star';

          return (
            <svg key={keyValue} width="17" height="16" aria-hidden="true">
              <use xlinkHref={icon}></use>
            </svg>
          );
        })
      }
      <p className="visually-hidden">Рейтинг: {rating}</p>
      {!isReviewCard && <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>}
    </div>
  );
};

export default Rating;
