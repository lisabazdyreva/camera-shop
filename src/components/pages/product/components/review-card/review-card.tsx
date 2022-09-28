import {Review} from '../../../../../types/types';
import { Rating } from '../../../../common/common';

import {getDateTime, getDateValue} from '../../../../../utils/utils';

interface ReviewCardProps {
  data: Review;
}
const ReviewCard = ({data}: ReviewCardProps) => {
  const {userName, id, rating, advantage, disadvantage, review, createAt} = data;

  const dateTime = getDateTime(createAt);
  const dateValue = getDateValue(createAt);


  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateTime}>{dateValue}</time>
      </div>
      <Rating rating={rating} id={id} isReviewCard />
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review}
          </p>
        </li>
      </ul>
    </li>
  );
};

export default ReviewCard;
