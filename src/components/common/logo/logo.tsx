interface LogoProps {
  isHeader: boolean,
}

const Logo = ({isHeader}: LogoProps) => {
  if (isHeader) {
    return (
      <a className="header__logo" href="#" aria-label="Переход на главную">
        <svg width="100" height="36" aria-hidden="true">
          <use xlinkHref="#icon-logo"></use>
        </svg>
      </a>
    );
  } else {
    return (
      <a className="footer__logo" href="#" aria-label="Переход на главную">
        <svg width="100" height="36" aria-hidden="true">
          <use xlinkHref="#icon-logo-mono"></use>
        </svg>
      </a>
    );
  }

};

export default Logo;
