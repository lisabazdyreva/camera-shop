import {Rating} from '../../../../common/common';

import {Review} from '../../../../../types/review';
import {getDateTime, getDateValue} from '../../../../../utils/utils';
import {RatingClass, ReviewItemsList} from '../../../../../utils/const';

interface ReviewCardProps {
  data: Review;
}

const ReviewCard = ({data}: ReviewCardProps):JSX.Element => {
  const {userName, id, rating, advantage, disadvantage, review, createAt} = data;

  const dateTime = getDateTime(createAt);
  const dateValue = getDateValue(createAt);

  const DataReview = {
    Advantage: advantage,
    Disadvantage: disadvantage,
    Review: review,
  } as const;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateTime}>{dateValue}</time>
      </div>
      <Rating isDetailed={false} rating={rating} id={id} additionalClass={RatingClass.Review}/>
      <ul className="review-card__list">
        {
          Object.values(ReviewItemsList).map((reviewItem, index) => {
            const text = Object.values(DataReview)[index];
            return (
              <li className="item-list" key={Object.keys(ReviewItemsList)[index]}>
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
