import {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../../types/action';
import {fetchReviews, postReview} from '../../../../../store/actions/api-actions/api-actions-reviews';
import {ReviewFormRateBar} from '../components';
import {InputErrorMessage, InputName} from '../../../../../utils/const';
import {
  checkIsAdvantageValid,
  checkIsDisadvantageValid, checkIsLength,
  checkIsNameValid,
  checkIsReviewValid
} from '../../../../../utils/utils';


interface ReviewFormProps {
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
  id: number;
}
const ReviewForm = ({handleCloseModal, handleOpenSuccessModal, id}: ReviewFormProps) => {
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [userName, setUserName] = useState('');

  const [isAdvantageValid, setIsAdvantageValid] = useState(true);
  const [advantage, setAdvantage] = useState('');

  const [isDisadvantageValid, setIsDisadvantageValid] = useState(true);
  const [disadvantage, setDisadvantage] = useState('');

  const [isReviewValid, setIsReviewValid] = useState(true);
  const [review, setReview] = useState('');

  const [isRatingValid, setIsRatingValid] = useState(true);
  const [rating, setSelectedRating] = useState(0);


  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    handleCloseModal(false);

    const data = {cameraId: id, userName, advantage, disadvantage, review, rating};

    dispatch(postReview(data))
      .then(() => {
        dispatch(fetchReviews(id));
        if (handleOpenSuccessModal) {
          handleOpenSuccessModal(true);
        }
      });
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = evt.target.value;

    switch (evt.currentTarget.name) {
      case InputName.Name: {
        setUserName(value);
        if (checkIsNameValid(evt)) {
          setIsUserNameValid(true);
        }
        break;
      }
      case InputName.Advantage: {
        setAdvantage(value);
        if (checkIsAdvantageValid(evt)) {
          setIsAdvantageValid(true);
        }
        break;
      }
      case InputName.Disadvantage: {
        setDisadvantage(value);
        if (checkIsDisadvantageValid(evt)) {
          setIsDisadvantageValid(true);
        }
        break;
      }
      case InputName.Review: {
        setReview(value);
        if (checkIsReviewValid(evt)) {
          setIsReviewValid(true);
        }
        break;
      }
    }
  };

  const handleButtonClick = () => {
    setIsUserNameValid(checkIsLength(userName));
    setIsAdvantageValid(checkIsLength(advantage));
    setIsDisadvantageValid(checkIsLength(disadvantage));
    setIsReviewValid(checkIsLength(review));
    setIsRatingValid(rating !== 0);
  };

  const icon = (
    <svg width="9" height="9" aria-hidden="true">
      <use xlinkHref="#icon-snowflake"></use>
    </svg>
  );

  return (
    <div className="form-review">
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="form-review__rate">
          <ReviewFormRateBar
            handleRateClick={(rate: number) => setSelectedRating(rate)}
            selectedRating={rating}
            isValid={isRatingValid}
            isValidHandler={setIsRatingValid}
          />
          <div className={`custom-input form-review__item ${!isUserNameValid && 'is-invalid'}`}>
            <label>
              <span className="custom-input__label">Ваше имя
                {icon}
              </span>
              <input
                data-testid='name'
                autoComplete='off'
                type="text"
                name='user-name'
                placeholder='Ваше имя'
                onChange={handleInputChange}
                value={userName}
                required
              />
            </label>
            <p className="custom-input__error">{InputErrorMessage.Name}</p>
          </div>

          <div className={`custom-input form-review__item ${!isAdvantageValid && 'is-invalid'}`}>
            <label>
              <span className="custom-input__label">Достоинства
                {icon}
              </span>
              <input
                data-testid='plus'
                autoComplete='off'
                type="text"
                name='user-plus'
                placeholder='Основные преимущества товара'
                onChange={handleInputChange}
                value={advantage}
                required
              />
            </label>
            <p className="custom-input__error">{InputErrorMessage.Advantage}</p>
          </div>

          <div className={`custom-input form-review__item ${!isDisadvantageValid && 'is-invalid'}`}>
            <label>
              <span className="custom-input__label">Недостатки
                {icon}
              </span>
              <input
                data-testid='minus'
                autoComplete='off'
                type="text"
                name='user-minus'
                placeholder='Главные недостатки товара'
                onChange={handleInputChange}
                value={disadvantage}
                required
              />
            </label>
            <p className="custom-input__error">{InputErrorMessage.Disadvantage}</p>
          </div>

          <div className={`custom-textarea form-review__item ${!isReviewValid && 'is-invalid'}`}>
            <label>
              <span className="custom-textarea__label">
                Комментарий
                {icon}
              </span>
              <textarea
                data-testid='review'
                name="user-comment"
                minLength={5}
                placeholder="Поделитесь своим опытом покупки"
                value={review}
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="custom-textarea__error">Нужно добавить комментарий</div>
          </div>
        </div>
        <button className="btn btn--purple form-review__btn" type="submit" onClick={handleButtonClick}>Отправить отзыв</button>
      </form>
    </div>
  );
};

export default ReviewForm;
