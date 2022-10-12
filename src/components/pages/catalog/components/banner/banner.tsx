import './banner.css';

import {useEffect} from 'react';
import {Link} from 'react-router-dom';

import {ErrorInfo, Loader, Picture} from '../../../../common/common';
import {AppRoute, ErrorData, LoadingStatus, TabType} from '../../../../../utils/const';
import {useAppDispatch, useAppSelector} from '../../../../../hooks';
import {getPromoLevel} from '../../../../../utils/utils';

import {fetchCameraAction} from '../../../../../store/api-actions/api-actions-cameras/api-actions-cameras';
import {getCamera} from '../../../../../store/camera/selectors';
import {getPromos, getPromosFetchStatus} from '../../../../../store/promos/selectors';


const Banner = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const promos = useAppSelector(getPromos);
  const fetchStatus = useAppSelector(getPromosFetchStatus);
  const camera = useAppSelector(getCamera);

  const isPromosLoaded = fetchStatus === LoadingStatus.Success;
  const isPromosLoading = fetchStatus === LoadingStatus.Loading;
  const isPromosError = fetchStatus === LoadingStatus.Error;

  const promo = isPromosLoaded && promos[0];

  const levelText = camera ? getPromoLevel(camera) : '';

  useEffect(() => {
    if (promo) {
      dispatch(fetchCameraAction({id: promo.id}));
    }
  }, [fetchStatus, dispatch, promo]);

  return (
    <div className="banner">
      {isPromosLoading && <Loader/>}
      {isPromosError && <ErrorInfo text={ErrorData.Banner}/>}
      {isPromosLoaded && promo &&
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
