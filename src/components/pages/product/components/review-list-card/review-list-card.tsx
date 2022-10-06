import {ErrorInfo, Loader} from '../../../../common/common';
import {ReviewCard} from '../components';
import {LoadingStatus, ErrorData} from '../../../../../utils/const';
import {useSelector} from 'react-redux';
import {getReviews} from '../../../../../store/app-data/selectors';
import {useState} from 'react';

interface ReviewListCardProps {
  fetchStatus: string;
}

const ReviewListCard = ({fetchStatus}: ReviewListCardProps) => {
  const [reviewsValue, setReviewsValue] = useState(3);
  const [isShowButtonActive, setIsShowButtonActive] = useState(true);

  const isReviewsLoaded = fetchStatus === LoadingStatus.Success;
  const isReviewsLoading = fetchStatus === LoadingStatus.Loading;
  const isReviewsError = fetchStatus === LoadingStatus.Error;

  const reviews = useSelector(getReviews);

  let reviewsPerIteration = reviews.slice(0, reviewsValue); // TODO with scroll?

  const handleButtonClick = () => {
    const newReviewValue = reviewsValue + 3;
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
