import {ErrorInfo, Loader} from '../../../../common/common';
import {ReviewCard} from '../components';
import {LoadingStatus, ErrorData} from '../../../../../utils/const';
import {Review} from '../../../../../types/types';

interface ReviewListCardProps {
  fetchStatus: string;
  reviews: Review[];
}

const ReviewListCard = ({fetchStatus, reviews}: ReviewListCardProps) => {
  const isReviewsLoaded = fetchStatus === LoadingStatus.Success;
  const isReviewsLoading = fetchStatus === LoadingStatus.Loading;
  const isReviewsError = fetchStatus === LoadingStatus.Error;

  return (
    <>
      {isReviewsError && <ErrorInfo text={ErrorData.Reviews} />}
      {isReviewsLoading && <Loader />}
      {isReviewsLoaded && <ul className="review-block__list">{reviews.map((review) => <ReviewCard key={review.id} data={review}/>)}</ul>}
    </>
  );
};

export default ReviewListCard;
