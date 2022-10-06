import {Fragment} from 'react';
import {ratings, ratingValues} from '../../../../../utils/utils';
import { MAX_RATING } from '../../../../../utils/const';

interface ReviewFormRateBarProps {
  handleRateClick: (rate: number) => void;
  selectedRating: number;
  isValid: boolean;
  isValidHandler: (isValid: boolean) => void;
}

const ReviewFormRateBar = ({handleRateClick, selectedRating, isValid, isValidHandler}: ReviewFormRateBarProps) => {
  const handleInputClick = (index: number) => {
    handleRateClick(ratingValues[index]);
    isValidHandler(true);
  };

  return (
    <fieldset className={`rate form-review__item ${!isValid && 'is-invalid'}`}>
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
                  <input onChange={() => handleInputClick(index)} className="visually-hidden" id={idRating} name="rate" type="radio" value={ratingValues[index]} />
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
  );
};


export default ReviewFormRateBar;
