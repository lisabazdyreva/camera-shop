import {ChangeEvent, FormEvent, Fragment} from 'react';

import {InputName, InputTitle, MAX_RATING, RatingDictionary, RatingValue} from '../../../../../utils/const';
import {useAppDispatch} from '../../../../../hooks';

import {setReviewFormData} from '../../../../../store/app-process/app-process';

interface ReviewFormRateBarProps {
  selectedRating: number;
  isValid: boolean | null;
  handleInputInvalid: (evt: FormEvent, rating?: number) => void;
}

const ReviewFormRateBar = ({selectedRating, isValid, handleInputInvalid}: ReviewFormRateBarProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const handleInputChange = (evt: ChangeEvent, index: number) => {
    dispatch(setReviewFormData({type: InputName.Rating, value: Object.values(RatingValue)[index]}));
    handleInputInvalid(evt, Object.values(RatingValue)[index]);
  };

  return (
    <fieldset className={`rate form-review__item ${isValid === false && 'is-invalid'}`} data-testid='rating'>
      <legend className="rate__caption">{InputTitle.Rating}
        <svg width="9" height="9" aria-hidden="true">
          <use xlinkHref="#icon-snowflake"></use>
        </svg>
      </legend>
      <div className="rate__bar">
        <div className="rate__group">
          {
            Object.values(RatingDictionary).map((rating, index) => {
              const idRating = `star-${Object.values(RatingValue)[index]}`;
              return (
                <Fragment key={rating}>
                  <input
                    className="visually-hidden"
                    required
                    onInvalid={handleInputInvalid}
                    onChange={(evt) => handleInputChange(evt, index)}
                    id={idRating}
                    name="rate"
                    type="radio"
                    value={Object.values(RatingValue)[index]}
                  />
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
