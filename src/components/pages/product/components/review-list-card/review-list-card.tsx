import './review-list-card.css';

import React, {useEffect, useState} from 'react';

import {ErrorInfo, Loader} from '../../../../common/common';
import {ReviewCard} from '../components';

import {LoadingStatusType} from '../../../../../types/types';
import {LoadingStatus, ErrorData, Step} from '../../../../../utils/const';
import {useAppSelector} from '../../../../../hooks';

import {getReviews} from '../../../../../store/reviews/selectors';


interface ReviewListCardProps {
  fetchStatus: LoadingStatusType;
}

const ReviewListCard = ({fetchStatus}: ReviewListCardProps):JSX.Element => {
  const reviews = useAppSelector(getReviews);

  const [reviewsValue, setReviewsValue] = useState<number>(Step.Reviews);
  const [isShowButtonActive, setIsShowButtonActive] = useState(true);

  const isReviewsLoaded = fetchStatus === LoadingStatus.Success;
  const isReviewsLoading = fetchStatus === LoadingStatus.Loading;
  const isReviewsError = fetchStatus === LoadingStatus.Error;

  let reviewsPerIteration = reviews.slice(0, reviewsValue);

  const handleButtonClick = () => {
    const newReviewValue = reviewsValue + Step.Reviews;
    reviewsPerIteration = reviews.slice(0, newReviewValue);

    if (reviews.length - newReviewValue < 0) {
      setIsShowButtonActive(false);
    }
    setReviewsValue(newReviewValue);
  };

  useEffect(() => {
    setIsShowButtonActive(reviews.length > Step.Reviews);
  }, [reviews.length]);

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
