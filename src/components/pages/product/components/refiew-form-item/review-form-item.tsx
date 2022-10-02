import {ChangeEvent, useState} from 'react';
import {checkValidity} from '../../../../../utils/utils';

interface ReviewFormItemProps {
  stateValue: string;
  handleStateValue: (evt: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  title: string;
  errorMessage: string;
}


const ReviewFormItem = ({stateValue, handleStateValue, placeholder, name, title, errorMessage}: ReviewFormItemProps) => {
  const [isValid, setIsValid] = useState(false);

  const icon = (
    <svg width="9" height="9" aria-hidden="true">
      <use xlinkHref="#icon-snowflake"></use>
    </svg>
  );

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsValid(checkValidity(evt));
    handleStateValue(evt);
  };

  return (
    <div className={`custom-input form-review__item ${!isValid && 'is-invalid'}`}>
      <label>
        <span className="custom-input__label">{title}
          {icon}
        </span>
        <input autoComplete='off' type="text" name={`user-${name}`} placeholder={placeholder} required onChange={handleInputChange} value={stateValue} />
      </label>
      <p className="custom-input__error">{errorMessage}</p>
    </div>
  );
};

export default ReviewFormItem;

