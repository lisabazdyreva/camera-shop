import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {ErrorInfo, Loader, Picture} from '../../../../common/common';
import {AppDispatch} from '../../../../../types/state';
import {AppRoute, CAMERA_ADJECTIVE_ENDING, ErrorData, LoadingStatus, TabType} from '../../../../../utils/const';

import {fetchCameraAction} from '../../../../../store/api-actions/api-actions-cameras';
import {getCamera} from '../../../../../store/app-camera/selectors';
import {getPromos, getPromosFetchStatus} from '../../../../../store/app-promos/selectors';


const Banner = ():JSX.Element => {
  const promos = useSelector(getPromos);
  const fetchStatus = useSelector(getPromosFetchStatus);
  const camera = useSelector(getCamera);

  const dispatch = useDispatch<AppDispatch>();

  const [promo] = promos;

  const isPromosLoaded = fetchStatus === LoadingStatus.Success;
  const isPromosLoading = fetchStatus === LoadingStatus.Loading;
  const isPromosError = fetchStatus === LoadingStatus.Error;

  const getPromoLevel = () => camera ? camera.level.slice(0, -2) + CAMERA_ADJECTIVE_ENDING : '';
  const levelText = getPromoLevel();

  useEffect(() => {
    if (isPromosLoaded) {
      const promoId = promo.id;
      dispatch(fetchCameraAction({id: promoId}));
    }
  }, [fetchStatus]);

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
