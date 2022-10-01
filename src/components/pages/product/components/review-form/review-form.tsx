import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../../types/action';
import {fetchReviews, postReview} from '../../../../../store/actions/api-actions/api-actions-reviews';

const RatingValue = {
  Excellent: 5,
  Good: 4,
  Normal: 3,
  Bad: 2,
  Worse: 1,
} as const;

const RatingDictionary = {
  Excellent: 'Отлично',
  Good: 'Хорошо',
  Normal: 'Нормально',
  Bad: 'Плохо',
  Worse: 'Ужасно',
} as const;

const MAX_RATING = 5;

const ratings = Object.values(RatingDictionary);
const ratingValues = Object.values(RatingValue);

interface ReviewFormProps {
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
  id: number;
}
const ReviewForm = ({handleCloseModal, handleOpenSuccessModal, id}: ReviewFormProps) => {
  //eslint-disable-next-line
  const [selectedRating, setSelectedRating] = useState(0);
  const [name, setName] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [review, setReview] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleRateClick = (rate: number) => {
    setSelectedRating(rate);
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    handleCloseModal(false);

    const data = {
      cameraId: id,
      userName: name,
      advantage,
      disadvantage,
      review,
      rating: selectedRating,
    };

    dispatch(postReview(data))
      .then(() => {
        dispatch(fetchReviews(id));
        if (handleOpenSuccessModal) {
          handleOpenSuccessModal(true);
        }
      });
    //eslint-disable-next-line
    console.log('submitted');
  };

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleAdvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAdvantage(evt.target.value);
  };

  const handleDisadvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setDisadvantage(evt.target.value);
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  return (
    <div className="form-review">
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="form-review__rate">
          <fieldset className="rate form-review__item">
            <legend className="rate__caption">Рейтинг
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                {
                  ratings.map((rating, index) => {
                    const idRating = `star-${ratingValues[index]}`;
                    return (
                      <Fragment key={rating}>
                        <input onChange={() => handleRateClick(ratingValues[index])} className="visually-hidden" id={idRating} name="rate" type="radio" value={ratingValues[index]} />
                        <label className="rate__label" htmlFor={idRating} title={rating}></label>
                      </Fragment>
                    );
                  })
                }
              </div>
              <div className="rate__progress"><span className="rate__stars">{selectedRating}</span>
                <span>/</span>
                <span className="rate__all-stars">{MAX_RATING}</span>
              </div>
            </div>
            <p className="rate__message">Нужно оценить товар</p>
          </fieldset>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">Ваше имя
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <input type="text" name="user-name" placeholder="Введите ваше имя" required onChange={handleNameChange} value={name} />
            </label>
            <p className="custom-input__error">Нужно указать имя</p>
          </div>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">Достоинства
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <input type="text" name="user-plus" placeholder="Основные преимущества товара" required onChange={handleAdvantageChange} value={advantage}/>
            </label>
            <p className="custom-input__error">Нужно указать достоинства</p>
          </div>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">
                Недостатки
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <input type="text" name="user-minus" placeholder="Главные недостатки товара" required onChange={handleDisadvantageChange} value={disadvantage}/>
            </label>
            <p className="custom-input__error">Нужно указать недостатки</p>
          </div>
          <div className="custom-textarea form-review__item">
            <label>
              <span className="custom-textarea__label">
                Комментарий
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <textarea name="user-comment" minLength={5} placeholder="Поделитесь своим опытом покупки" value={review} onChange={handleReviewChange}></textarea>
            </label>
            <div className="custom-textarea__error">Нужно добавить комментарий</div>
          </div>
        </div>
        <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
      </form>
    </div>
  );
};

export default ReviewForm;
