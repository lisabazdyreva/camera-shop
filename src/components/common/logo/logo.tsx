import {AppRoute, ComponentName, DefaultValue, TabType} from '../../../utils/const';
import {ComponentNameType} from '../../../types/types';

interface LogoProps {
  usingComponent: ComponentNameType,
}

const Logo = ({usingComponent}: LogoProps):JSX.Element => {
  const icon = usingComponent === ComponentName.Footer ? '#icon-logo-mono' : '#icon-logo';
  return (
    <a className={`${usingComponent}__logo`} href={`${AppRoute.Catalog}${DefaultValue.CatalogPageNumber}${TabType.Features}`} aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={icon}></use>
      </svg>
    </a>
  );
};

export default Logo;
