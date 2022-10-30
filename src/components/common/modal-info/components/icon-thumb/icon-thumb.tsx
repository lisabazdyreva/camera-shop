import {LoadingStatus} from '../../../../../utils/const';
import {LoadingStatusType} from '../../../../../types/types';

interface IconReviewProps {
  status: LoadingStatusType;
}

const IconThumb = ({status}: IconReviewProps):JSX.Element => {
  const isSuccess = status === LoadingStatus.Success;
  const isError = status === LoadingStatus.Error;

  return (
    <svg
      data-testid={isSuccess ? 'review-icon-svg-success' : 'review-icon-svg-error'}
      className={`modal__icon ${isError && 'rotate'}`}
      width="80"
      height="78"
      aria-hidden="true"
    >
      {isSuccess && <use xlinkHref="#icon-review-success"></use>}
      {isError && <use xlinkHref="#icon-review-error"></use>}
    </svg>
  );
};

export default IconThumb;
