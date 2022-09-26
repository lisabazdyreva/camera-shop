import FooterNavItem from '../footer-nav-item/footer-nav-item';
import Social from '../../social/social';
import Logo from '../logo/logo';


//eslint-disable-next-line
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Logo isHeader={false} />
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <Social />
        </div>
        <ul className="footer__nav">
          <FooterNavItem />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
