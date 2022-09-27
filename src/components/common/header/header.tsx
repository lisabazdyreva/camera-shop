import Search from '../search/search';
import HeaderNavItem from '../header-nav-item/header-nav-item';
import Logo from '../logo/logo';
import {menuItems} from '../../../utils/utils';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../types/const';


//eslint-disable-next-line
const Header = () => {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo isHeader />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {
              menuItems.map((itemName, index) => <HeaderNavItem name={itemName} key={`${itemName}_${itemName.length}`} />)
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
