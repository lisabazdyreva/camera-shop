import {Review} from '../../../../../types/types';
import { Rating } from '../../../../common/common';

import {getDateTime, getDateValue, reviewItems, reviewNames} from '../../../../../utils/utils';
import {RatingClass} from '../../../../../utils/const';

interface ReviewCardProps {
  data: Review;
}

const ReviewCard = ({data}: ReviewCardProps) => {
  const {userName, id, rating, advantage, disadvantage, review, createAt} = data;

  const dateTime = getDateTime(createAt);
  const dateValue = getDateValue(createAt);

  const DataReview = {
    Advantage: advantage,
    Disadvantage: disadvantage,
    Review: review,
  } as const;

  const dataReviews = Object.values(DataReview);

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateTime}>{dateValue}</time>
      </div>
      <Rating isDetailed={false} rating={rating} id={id} additionalClass={RatingClass.Review}/>
      <ul className="review-card__list">
        {
          reviewItems.map((reviewItem, index) => {
            const text = dataReviews[index];
            return (
              <li className="item-list" key={reviewNames[index]}>
                <span className="item-list__title">{reviewItem}</span>
                <p className="item-list__text">{text}</p>
              </li>
            );
          })
        }
      </ul>
    </li>
  );
};

export default ReviewCard;
