import Search from '../search/search';
import {NavItem} from '../common';
import Logo from '../logo/logo';
import {menuItems} from '../../../utils/utils';
import {Link} from 'react-router-dom';
import {AppRoute, ComponentName} from '../../../utils/const';


//eslint-disable-next-line
const Header = () => {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo usingComponent={ComponentName.Header} />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {
              menuItems.map((menuItem) => <NavItem usingComponent={ComponentName.Header} name={menuItem} key={`${menuItem}_${menuItem.length}`} />)
            }
            {/*TODO keyprop*/}
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
};

export default Header;
