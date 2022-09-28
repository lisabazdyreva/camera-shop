import FooterNavigations from '../footer-navigations/footer-navigations';
import Social from '../social/social';
import Logo from '../logo/logo';
import {ComponentName} from '../../../utils/const';


const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__info">
        <Logo usingComponent={ComponentName.Footer} />
        <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
        <Social />
      </div>
      <ul className="footer__nav">
        <FooterNavigations />
      </ul>
    </div>
  </footer>
);

export default Footer;
