import {Logo, Social, FooterNavigation} from '../common';
import {ComponentName} from '../../../utils/const';

const Footer = ():JSX.Element => (
  <footer className="footer">
    <div className="container">
      <div className="footer__info">
        <Logo usingComponent={ComponentName.Footer} />
        <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
        <Social />
      </div>
      <ul className="footer__nav" data-testid='footer-navigation'>
        <FooterNavigation />
      </ul>
    </div>
  </footer>
);

export default Footer;
