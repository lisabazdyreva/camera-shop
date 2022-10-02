import {ChangeEvent, useState} from 'react';

const useForm = () => {

  const [selectedRating, setSelectedRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [review, setReview] = useState('');

  const handleRateClick = (rate: number) => {
    setSelectedRating(rate);
  };

  const handleUserNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.target.value);
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

  return {
    stateValue: {
      selectedRating,
      userName,
      advantage,
      disadvantage,
      review,
    },
    handler: {
      handleRateClick,
      handleUserNameChange,
      handleAdvantageChange,
      handleDisadvantageChange,
      handleReviewChange
    }
  };

};

export default useForm;
