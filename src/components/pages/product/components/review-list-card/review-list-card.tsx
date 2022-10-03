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
    <ul className="review-block__list">
      {isReviewsError && <ErrorInfo text={ErrorData.Reviews} />}
      {isReviewsLoading && <Loader />}
      {isReviewsLoaded && reviews.map((review) => <ReviewCard key={review.id} data={review}/>)}
    </ul>
  );
};

export default ReviewListCard;
