import {Link} from 'react-router-dom';
import {Logo, NavItem, Search} from '../common';

import {menuItems} from '../../../utils/utils';
import {AppRoute, ComponentName} from '../../../utils/const';


const Header = ():JSX.Element => (
  <header className="header" id="header">
    <div className="container">
      <Logo usingComponent={ComponentName.Header} />
      <nav className="main-nav header__main-nav">
        <ul className="main-nav__list">
          {
            menuItems.map((menuItem) => <NavItem usingComponent={ComponentName.Header} name={menuItem} key={`${menuItem}_${menuItem.length}`} />)
          }
        </ul>
      </nav>
      <Search />
      <Link className="header__basket-link" to={AppRoute.Basket}>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-basket"></use>
        </svg>
      </Link>
    </div>
  </header>
);


export default Header;
