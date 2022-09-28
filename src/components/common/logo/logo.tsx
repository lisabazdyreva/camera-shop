import {ComponentName, ComponentNameType} from '../../../utils/const';

interface LogoProps {
  usingComponent: ComponentNameType,
}

const Logo = ({usingComponent}: LogoProps) => {
  const icon = usingComponent === ComponentName.Footer ? '#icon-logo-mono' : '#icon-logo';
  return (
    <a className={`${usingComponent}__logo`} href="#" aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={icon}></use>
      </svg>
    </a>
  );
};

export default Logo;
