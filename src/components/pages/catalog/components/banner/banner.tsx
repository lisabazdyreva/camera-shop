import {Link} from 'react-router-dom';
import {AppRoute} from '../../../../../types/const';
import {Promo} from '../../../../../types/types';

interface BannerProps {
  promos: Promo[];
}

const Banner = ({promos}: BannerProps) => {
  const [promo] = promos;
  const {id, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name} = promo;

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
        <img
          src={previewImg}
          srcSet={`${previewImg2x} 2x`}
          width="1280"
          height="280"
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppRoute.Product}/${id}`}>Подробнее</Link>
      </p>
    </div>
  );
};

export default Banner;
