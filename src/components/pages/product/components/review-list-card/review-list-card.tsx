import {useState} from 'react';
import {useSelector} from 'react-redux';

import {ErrorInfo, Loader} from '../../../../common/common';
import {ReviewCard} from '../components';

import {LoadingStatusType} from '../../../../../types/types';
import {LoadingStatus, ErrorData, REVIEWS_PER_TIME} from '../../../../../utils/const';

import {getReviews} from '../../../../../store/app-reviews/selectors';


interface ReviewListCardProps {
  fetchStatus: LoadingStatusType;
}



const ReviewListCard = ({fetchStatus}: ReviewListCardProps):JSX.Element => {
  const [reviewsValue, setReviewsValue] = useState(REVIEWS_PER_TIME);
  const [isShowButtonActive, setIsShowButtonActive] = useState(true);

  const reviews = useSelector(getReviews);

  const isReviewsLoaded = fetchStatus === LoadingStatus.Success;
  const isReviewsLoading = fetchStatus === LoadingStatus.Loading;
  const isReviewsError = fetchStatus === LoadingStatus.Error;

  let reviewsPerIteration = reviews.slice(0, reviewsValue); // TODO with scroll?

  const handleButtonClick = () => {
    const newReviewValue = reviewsValue + REVIEWS_PER_TIME;
    reviewsPerIteration = reviews.slice(0, newReviewValue);

    if (reviews.length - newReviewValue < 0) {
      setIsShowButtonActive(false);
    }
    setReviewsValue(newReviewValue);
  };

  return (
    <>
      {isReviewsError && <ErrorInfo text={ErrorData.Reviews} />}
      {isReviewsLoading && <Loader />}
      {isReviewsLoaded &&
        <>
          <ul className="review-block__list">
            {reviewsPerIteration.map((review) => <ReviewCard key={review.id} data={review}/>)}
          </ul>
          {isShowButtonActive &&
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={handleButtonClick}>Показать больше отзывов</button>
            </div>}
        </>}
    </>
  );
};

export default ReviewListCard;
