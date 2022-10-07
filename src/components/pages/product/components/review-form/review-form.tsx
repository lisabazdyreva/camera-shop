import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ReviewFormRateBar} from '../components';

import {FORM_ID_TYPE, InputErrorMessage, InputName, InputPlaceholder, InputTitle} from '../../../../../utils/const';
import {checkIsValid} from '../../../../../utils/utils';
import {AppDispatch} from '../../../../../types/state';

import {cleanForm, setReviewFormData} from '../../../../../store/app-process/app-process';
import {getReviewFormData} from '../../../../../store/app-process/selectors';
import {fetchReviewsAction, postReviewAction} from '../../../../../store/api-actions/api-actions-reviews';

type isValidState = {
  userName: boolean | null,
  advantage: boolean | null,
  disadvantage: boolean | null,
  review: boolean | null,
  rating: boolean | null
};

const initialIsValidState = {
  userName: null,
  advantage: null,
  disadvantage: null,
  review: null,
  rating: null,
};

interface ReviewFormProps {
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
  id: number;
}

const ReviewForm = ({handleCloseModal, handleOpenSuccessModal, id}: ReviewFormProps):JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector(getReviewFormData);

  const [validity, setValidity] = useState<isValidState>(initialIsValidState);

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    handleCloseModal(false);

    dispatch(postReviewAction(formData))
      .then(() => {
        dispatch(fetchReviewsAction({id}));
        dispatch(cleanForm());
      });

    if (handleOpenSuccessModal) {
      handleOpenSuccessModal(true);
    }
  };

  const handleInputInvalid = (evt: FormEvent, rating?: number) => {
    const target = evt.target as HTMLInputElement | HTMLTextAreaElement;
    const isValid = checkIsValid(target);

    let validityItem;
    switch (target.name) {
      case InputName.Name :
        validityItem = {userName: isValid};
        break;
      case InputName.Advantage:
        validityItem = {advantage: isValid};
        break;
      case InputName.Disadvantage:
        validityItem = {disadvantage: isValid};
        break;
      case InputName.Review:
        validityItem = {review: isValid};
        break;
      case InputName.Rating:
        validityItem = {rating: rating !== 0 && rating !== undefined};
        break;
    }
    setValidity({...validity, ...validityItem});
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = evt.target.value;
    dispatch(setReviewFormData({type: evt.target.name, value}));
    handleInputInvalid(evt);
  };

  const getBlockClasses = (value: boolean | null) => `custom-input form-review__item
  ${value === false && 'is-invalid'} ${value && 'is-valid'}`;

  const icon = (
    <svg width="9" height="9" aria-hidden="true">
      <use xlinkHref="#icon-snowflake"></use>
    </svg>
  );

  useEffect(() => {
    dispatch(setReviewFormData({type: FORM_ID_TYPE, value: id}));
  }, [id]);

  return (
    <div className="form-review">
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="form-review__rate">
          <ReviewFormRateBar
            selectedRating={formData.rating}
            isValid={validity.rating}
            handleInputInvalid={handleInputInvalid}
          />
          <div className={getBlockClasses(validity.userName)}>
            <label>
              <span className="custom-input__label">{InputTitle.Name}
                {icon}
              </span>
              <input
                data-testid='name'
                autoComplete='off'
                type="text"
                name='user-name'
                placeholder={InputPlaceholder.Name}
                onChange={handleInputChange}
                value={formData.userName}
                required
                onInvalid={handleInputInvalid}
              />
            </label>
            <p className="custom-input__error">{InputErrorMessage.Name}</p>
          </div>

          <div className={getBlockClasses(validity.advantage)}>
            <label>
              <span className="custom-input__label">{InputTitle.Advantage}
                {icon}
              </span>
              <input
                data-testid='plus'
                autoComplete='off'
                type="text"
                name='user-plus'
                placeholder={InputPlaceholder.Advantage}
                onChange={handleInputChange}
                value={formData.advantage}
                required
                onInvalid={handleInputInvalid}
              />
            </label>
            <p className="custom-input__error">{InputErrorMessage.Advantage}</p>
          </div>

          <div className={getBlockClasses(validity.disadvantage)}>
            <label>
              <span className="custom-input__label">{InputTitle.Disadvantage}
                {icon}
              </span>
              <input
                data-testid='minus'
                autoComplete='off'
                type="text"
                name='user-minus'
                placeholder={InputPlaceholder.Disadvantage}
                onChange={handleInputChange}
                value={formData.disadvantage}
                required
                onInvalid={handleInputInvalid}
              />
            </label>
            <p className="custom-input__error">{InputErrorMessage.Disadvantage}</p>
          </div>

          <div className={`custom-textarea form-review__item ${validity.review === false && 'is-invalid'}`}>
            <label>
              <span className="custom-textarea__label">
                {InputTitle.Review}
                {icon}
              </span>
              <textarea
                data-testid='review'
                name="user-comment"
                minLength={5}
                placeholder={InputPlaceholder.Review}
                value={formData.review}
                onChange={handleInputChange}
                required
                onInvalid={handleInputInvalid}
              />
            </label>
            <div className="custom-textarea__error">Нужно добавить комментарий</div>
          </div>
        </div>
        <button className="btn btn--purple form-review__btn" type="submit" >Отправить отзыв</button>
      </form>
    </div>
  );
};

export default ReviewForm;
