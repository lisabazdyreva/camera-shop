import './warning-info.css';

interface WarningInfoProps {
  text: string;
}

const WarningInfo = ({text}: WarningInfoProps) => (
  <div className='warning-text'>
    {text}
  </div>
);

export default WarningInfo;
