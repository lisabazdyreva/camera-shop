interface ErrorInfoProps {
  text: string;
}

const ErrorInfo = ({text}: ErrorInfoProps) => <p className='error-text'>Произошла ошибка при загрузке {text}, попробуйте позже.</p>;

export default ErrorInfo;
