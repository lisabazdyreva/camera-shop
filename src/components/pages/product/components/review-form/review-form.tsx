import {FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../../types/action';
import {fetchReviews, postReview} from '../../../../../store/actions/api-actions/api-actions-reviews';
import {ReviewFormItem, ReviewFormRateBar, ReviewFormComment} from '../components';
import {
  inputs,
  inputNames,
  inputPlaceholders,
  inputTitles,
  inputErrorMessages,
} from '../../../../../utils/utils';
import useForm from '../../../../../hooks/product-hooks/useForm';


interface ReviewFormProps {
  handleCloseModal: (isOpen: boolean) => void;
  handleOpenSuccessModal?: (isOpen: boolean) => void;
  id: number;
}
const ReviewForm = ({handleCloseModal, handleOpenSuccessModal, id}: ReviewFormProps) => {

  const {stateValue, handler} = useForm();
  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    handleCloseModal(false);

    const data = {
      cameraId: id,
      userName: stateValue.userName,
      advantage: stateValue.advantage,
      disadvantage: stateValue.disadvantage,
      review: stateValue.review,
      rating: stateValue.selectedRating,
    };

    dispatch(postReview(data))
      .then(() => {
        dispatch(fetchReviews(id));
        if (handleOpenSuccessModal) {
          handleOpenSuccessModal(true);
        }
      });
  };

  const InputState = {
    Name: {
      value: stateValue.userName,
      handler: handler.handleUserNameChange,
    },
    Advantage: {
      value: stateValue.advantage,
      handler: handler.handleAdvantageChange,
    },
    Disadvantage: {
      value: stateValue.disadvantage,
      handler: handler.handleDisadvantageChange,
    },
  } as const;
  const inputStates = Object.values(InputState);

  return (
    <div className="form-review">
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="form-review__rate">
          <ReviewFormRateBar
            handleRateClick={handler.handleRateClick}
            selectedRating={stateValue.selectedRating}
          />

          {
            inputs.map((input, index) => {
              const placeholder = inputPlaceholders[index];
              const name = inputNames[index];
              const errorMessage = inputErrorMessages[index];
              const state = inputStates[index].value;
              const handlerStateValue = inputStates[index].handler;
              const title = inputTitles[index];

              return (
                <ReviewFormItem
                  errorMessage={errorMessage}
                  title={title}
                  placeholder={placeholder}
                  name={name}
                  key={input}
                  stateValue={state}
                  handleStateValue={handlerStateValue}
                />
              );
            })
          }
          <ReviewFormComment
            handleReviewChange={handler.handleReviewChange}
            review={stateValue.review}
          />
        </div>
        <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
      </form>
    </div>
  );
};

export default ReviewForm;
