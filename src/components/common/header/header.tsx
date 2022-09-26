import Search from '../search/search';
import HeaderNavItem from '../header-nav-item/header-nav-item';
import Logo from '../logo/logo';


//eslint-disable-next-line
const Header = () => {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo isHeader />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <HeaderNavItem />
          </ul>
        </nav>
        <Search />
        <a className="header__basket-link" href="#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
