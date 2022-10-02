import {ChangeEvent } from 'react';//useState

interface ReviewFormCommentProps {
  handleReviewChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
  review: string;
}

const MIN_REVIEW_LENGTH = 5;

const ReviewFormComment = ({handleReviewChange, review}: ReviewFormCommentProps) => {
  const icon = (
    <svg width="9" height="9" aria-hidden="true">
      <use xlinkHref="#icon-snowflake"></use>
    </svg>
  );

  return (
    <div className={`custom-textarea form-review__item ${review.length < MIN_REVIEW_LENGTH && 'is-invalid'}`}>
      <label>
        <span className="custom-textarea__label">
          Комментарий
          {icon}
        </span>
        <textarea name="user-comment" minLength={MIN_REVIEW_LENGTH} placeholder="Поделитесь своим опытом покупки" value={review} onChange={handleReviewChange}></textarea>
      </label>
      <div className="custom-textarea__error">Нужно добавить комментарий</div>
    </div>
  );
};

export default ReviewFormComment;
