import './nav-item.css';

import {Link} from 'react-router-dom';
import {AppRoute, ComponentName, DefaultValue, MenuItem} from '../../../utils/const';
import {ComponentNameType, MenuItemsType, SourceItemsType, SupportItemsType} from '../../../types/types';


const NavClass = {
  HeaderItem: 'main-nav__item',
  FooterItem: 'footer__item',
  HeaderLink: 'main-nav__link',
  FooterLink: 'link',
} as const;

interface NavItemProps {
  name: MenuItemsType | SourceItemsType | SupportItemsType;
  usingComponent: ComponentNameType;
}

const NavItem = ({name, usingComponent}: NavItemProps):JSX.Element => {
  const classesListItem = usingComponent === ComponentName.Header ? NavClass.HeaderItem : NavClass.FooterItem;
  const classesLink = usingComponent === ComponentName.Header ? NavClass.HeaderLink : NavClass.FooterLink;

  const catalogLink = (
    <Link to={`${AppRoute.Catalog}${AppRoute.Page}${DefaultValue.CatalogPageNumber}`} className={classesLink}>
      {name}
    </Link>
  );

  return (
    <li className={classesListItem}>
      {name === MenuItem.Catalog ? catalogLink : <Link className={classesLink} to={AppRoute.Catalog}>{name}</Link>}
    </li>
  );
};

export default NavItem;
