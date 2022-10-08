import {NavItem} from '../common';

import {ComponentName} from '../../../utils/const';
import {footerNavs} from '../../../utils/utils';

const FooterNavigation = ():JSX.Element => (
  <>
    {
      footerNavs.map((footerNav) => {
        const title = footerNav.Translation;

        return (
          <li className="footer__nav-item" key={title}>
            <p className="footer__title">{title}</p>
            <ul className="footer__list">
              {
                footerNav.Items.map((item) =>
                  <NavItem usingComponent={ComponentName.Footer} name={item} key={`${item}`} />)
              }
            </ul>
          </li>
        );
      })
    }
  </>
);


export default FooterNavigation;
