import {Link} from 'react-router-dom';
import {AppRoute, CAMERA_ADJECTIVE_ENDING, ErrorData, LoadingStatus} from '../../../../../utils/const';
import {Promo} from '../../../../../types/types';
import {ErrorInfo, Loader, Picture} from '../../../../common/common';
import {TabType} from '../../../../../utils/const';

interface BannerProps {
  promos: Promo[];
  level: string;
  fetchStatus: string;
}

const Banner = ({promos, level, fetchStatus}: BannerProps) => {
  const [promo] = promos;

  const isPromosLoaded = fetchStatus === LoadingStatus.Success;
  const isPromosLoading = fetchStatus === LoadingStatus.Loading;
  const isPromosError = fetchStatus === LoadingStatus.Error;

  const levelText = level.slice(0, -2) + CAMERA_ADJECTIVE_ENDING;
  return (
    <div className="banner">
      {isPromosLoading && <Loader/>}
      {isPromosError && <ErrorInfo text={ErrorData.Banner}/>}
      {isPromosLoaded &&
        <>
          <Picture
            width={1280}
            height={280}
            alt={'баннер'}
            src={`/${promo.previewImg}`}
            srcSetImg={`/${promo.previewImg2x}`}
            srcSetSource={[`/${promo.previewImgWebp}`, `/${promo.previewImgWebp2x}`]}
          />
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">{promo.name}</span>
            <span className="banner__text">{levelText} камера от&nbsp;известного производителя</span>
            <Link className="btn" to={`${AppRoute.Product}/${promo.id}/${TabType.Features}`}>Подробнее</Link>
          </p>
        </>}

    </div>
  );
};

export default Banner;
