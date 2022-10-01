import {
  AppRoute,
  ComponentName, DefaultValue,
  MenuItemsType,
  PaginationRoute,
  SourceItemsType,
  SupportItemsType
} from '../../../utils/const';
import {MenuItem} from '../../../utils/const';
import {Link} from 'react-router-dom';

interface NavItemProps {
  name: MenuItemsType | SourceItemsType | SupportItemsType,
  usingComponent: typeof ComponentName[keyof typeof ComponentName],
}

const NavItem = ({name, usingComponent}: NavItemProps) => {
  const classesListItem = usingComponent === ComponentName.Header ? 'main-nav__item' : 'footer__item';
  const classesLink = usingComponent === ComponentName.Header ? 'main-nav__link' : 'link';

  return (
    <li className={classesListItem}>
      {
        name === MenuItem.Catalog
          ? <Link to={`${AppRoute.Catalog}${PaginationRoute.Page}${DefaultValue.CatalogPageNumber}`} className={classesLink}>{name}</Link>
          : <a className={classesLink} href="#">{name}</a>
      }
    </li>
  );
};

export default NavItem;
