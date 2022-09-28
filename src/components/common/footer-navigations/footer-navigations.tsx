import {menuItems, sourceItems, supportItems} from '../../../utils/utils';
import {NavItem} from '../common';
import {ComponentName} from '../../../utils/const';
//eslint-disable-next-line
const FooterNavigations = () => {
  //TODO add render
  {/*TODO keyprop*/}
  return (
    <>
      <li className="footer__nav-item">
        <p className="footer__title">Навигация</p>
        <ul className="footer__list">
          {
            menuItems.map((menuItem) =>
              <NavItem usingComponent={ComponentName.Footer} name={menuItem} key={`${menuItem}_${menuItem.length}`} />)
          }
        </ul>
      </li>
      <li className="footer__nav-item">
        <p className="footer__title">Ресурсы</p>
        <ul className="footer__list">
          {
            sourceItems.map((sourceItem) =>
              <NavItem usingComponent={ComponentName.Footer} name={sourceItem} key={`${sourceItem}_${sourceItem.length}`} />)
          }
        </ul>
      </li>
      <li className="footer__nav-item">
        <p className="footer__title">Поддержка</p>
        <ul className="footer__list">
          {
            supportItems.map((supportItem) =>
              <NavItem usingComponent={ComponentName.Footer} name={supportItem} key={`${supportItem}_${supportItem.length}`} />)
          }
        </ul>
      </li>
    </>
  );
};

export default FooterNavigations;
