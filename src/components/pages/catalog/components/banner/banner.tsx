//eslint-disable-next-line
const Banner = () => {
  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x" />
        <img
          src="img/content/banner-bg.jpg"
          srcSet="img/content/banner-bg@2x.jpg 2x"
          width="1280"
          height="280"
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <a className="btn" href="src/components/pages/catalog/components/banner/banner#">Подробнее</a>
      </p>
    </div>
  );
};

export default Banner;
