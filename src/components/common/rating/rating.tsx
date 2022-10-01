import {ratings} from '../../../utils/utils';
import {RatingClassType} from '../../../utils/const';

interface RatingProps {
  rating: number,
  reviewCount?: number,
  id: number | string,
  isDetailed: boolean;
  additionalClass: RatingClassType;
}

const Rating = ({rating, reviewCount, id, isDetailed, additionalClass} :RatingProps) => (
  <div className={`rate ${additionalClass}`}>
    {
      ratings.map((ratingItem) => {
        const keyValue = `${id}_${ratingItem}`;
        const icon = rating >= ratingItem ? '#icon-full-star' : '#icon-star';

        return (
          <svg key={keyValue} width="17" height="16" aria-hidden="true">
            <use xlinkHref={icon}></use>
          </svg>
        );
      })
    }
    <p className="visually-hidden">Рейтинг: {rating}</p>
    {isDetailed && <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>}
  </div>
);


export default Rating;
