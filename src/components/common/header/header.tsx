import './header.css';

import {Link} from 'react-router-dom';
import {Logo, NavItem, Search} from '../common';
import {AppRoute, ComponentName, MenuItem} from '../../../utils/const';
import {useAppSelector} from '../../../hooks';
import {getBasket} from '../../../store/process/selectors';


const Header = ():JSX.Element => {
  const cameras = useAppSelector(getBasket);

  return (
    <header className="header" id="header">
      <div className="container">
        <Logo usingComponent={ComponentName.Header} />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list" data-testid='header-list'>
            {
              Object.values(MenuItem).map((menuItem) => <NavItem usingComponent={ComponentName.Header} name={menuItem} key={`${menuItem}_${menuItem.length}`} />)
            }
          </ul>
        </nav>
        <Search />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {cameras.length ? <span className="header__basket-count">{cameras.length}</span> : ''}
        </Link>
      </div>
    </header>
  );
};

export default Header;
