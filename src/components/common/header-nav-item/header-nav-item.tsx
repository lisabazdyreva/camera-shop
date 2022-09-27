import {AppRoute, MenuItemsType} from '../../../types/const';
import {MenuItem} from '../../../types/const';
import {Link} from 'react-router-dom';

interface HeaderNavItemProps {
  name: MenuItemsType,
}
//eslint-disable-next-line
const HeaderNavItem = ({name}: HeaderNavItemProps) => {
  return (
    <li className="main-nav__item">
      {
        name === MenuItem.Catalog
          ? <Link to={AppRoute.Catalog} className="main-nav__link">{name}</Link>
          : <a className="main-nav__link" href="#">{name}</a>
      }
    </li>
  );
};

export default HeaderNavItem;
