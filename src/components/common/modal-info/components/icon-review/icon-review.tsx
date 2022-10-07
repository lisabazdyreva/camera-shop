import {LoadingStatus} from '../../../../../utils/const';
import {LoadingStatusType} from '../../../../../types/types';

interface IconReviewProps {
  status: LoadingStatusType;
}

const IconReview = ({status}: IconReviewProps):JSX.Element => {
  const isSuccess = status === LoadingStatus.Success;
  const isError = status === LoadingStatus.Error;

  return (
    <svg className={`modal__icon ${isError && 'rotate'}`} width="80" height="78" aria-hidden="true" >
      {isSuccess && <use xlinkHref="#icon-review-success"></use>}
      {isError && <use xlinkHref="#icon-review-error"></use>}
    </svg>
  );
};

export default IconReview;
