interface ReturnButtonProps {
  handleCloseSuccessModal?: (isOpen: boolean) => void;
}

const ReturnButton = ({handleCloseSuccessModal}: ReturnButtonProps) => {
  const handleButtonClick = () => {
    if (handleCloseSuccessModal) {
      handleCloseSuccessModal(false);
    }
  };

  return (
    <button onClick={handleButtonClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам</button>
  );
};

export default ReturnButton;
