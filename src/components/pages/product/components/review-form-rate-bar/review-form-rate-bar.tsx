import {ChangeEvent, FormEvent, Fragment} from 'react';
import {ratings, ratingValues} from '../../../../../utils/utils';
import {InputName, InputTitle, MAX_RATING} from '../../../../../utils/const';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../../types/state';
import {setReviewFormData} from '../../../../../store/app-process/app-process';

interface ReviewFormRateBarProps {
  selectedRating: number;
  isValid: boolean | null;
  handleInputInvalid: (evt: FormEvent, rating?: number) => void;
}

const ReviewFormRateBar = ({selectedRating, isValid, handleInputInvalid}: ReviewFormRateBarProps):JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (evt: ChangeEvent, index: number) => {
    dispatch(setReviewFormData({type: InputName.Rating, value: ratingValues[index]}));
    handleInputInvalid(evt, ratingValues[index]);
  };

  return (
    <fieldset className={`rate form-review__item ${isValid === false && 'is-invalid'}`}>
      <legend className="rate__caption">{InputTitle.Rating}
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
                  <input
                    className="visually-hidden"
                    required
                    onInvalid={handleInputInvalid}
                    onChange={(evt) => handleInputChange(evt, index)}
                    id={idRating}
                    name="rate"
                    type="radio"
                    value={ratingValues[index]}
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
