import {Link} from 'react-router-dom';

import {AppRoute, ComponentName, DefaultValue, PaginationRoute, MenuItem} from '../../../utils/const';
import {MenuItemsType, SourceItemsType, SupportItemsType} from '../../../types/types';

interface NavItemProps {
  name: MenuItemsType | SourceItemsType | SupportItemsType,
  usingComponent: typeof ComponentName[keyof typeof ComponentName],
}

const NavItem = ({name, usingComponent}: NavItemProps):JSX.Element => {
  const classesListItem = usingComponent === ComponentName.Header ? 'main-nav__item' : 'footer__item';
  const classesLink = usingComponent === ComponentName.Header ? 'main-nav__link' : 'link';

  return (
    <li className={classesListItem}>
      {
        name === MenuItem.Catalog
          ? <Link to={`${AppRoute.Catalog}${PaginationRoute.Page}${DefaultValue.CatalogPageNumber}`} className={classesLink}>{name}</Link>
          : <a className={classesLink} href={AppRoute.Catalog}>{name}</a>
      }
    </li>
  );
};

export default NavItem;
