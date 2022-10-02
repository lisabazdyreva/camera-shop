import {Link} from 'react-router-dom';
import {AppRoute, CAMERA_ADJECTIVE_ENDING} from '../../../../../utils/const';
import {Promo} from '../../../../../types/types';
import {Picture} from '../../../../common/common';
import {TabType} from '../../../../../utils/const';

interface BannerProps {
  promos: Promo[];
  level: string;
}


const Banner = ({promos, level}: BannerProps) => {
  const [promo] = promos;
  const {id, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name} = promo;

  const levelText = level.slice(0, -2) + CAMERA_ADJECTIVE_ENDING;
  return (
    <div className="banner">
      <Picture
        width={1280}
        height={280}
        alt={'баннер'}
        src={`/${previewImg}`}
        srcSetImg={`/${previewImg2x}`}
        srcSetSource={[`/${previewImgWebp}`, `/${previewImgWebp2x}`]}
      />
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">{levelText} камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppRoute.Product}/${id}/${TabType.Features}`}>Подробнее</Link>
      </p>
    </div>
  );
};

export default Banner;
