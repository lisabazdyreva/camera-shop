import {useSelector} from 'react-redux';
import {getCameras, getPromos} from '../../store/app-data/selectors';
import {getCamerasFetchStatus, getPromosFetchStatus} from '../../store/app-status/selectors';
import {getCurrentPage} from '../../store/app-process/selectors';

const useCatalogSelectors = () => {
  const cameras = useSelector(getCameras);
  const promos = useSelector(getPromos);
  const promosFetchStatus = useSelector(getPromosFetchStatus);
  const camerasFetchStatus = useSelector(getCamerasFetchStatus);
  const currentPageNumber = useSelector(getCurrentPage);

  return {cameras, promos, promosFetchStatus, camerasFetchStatus, currentPageNumber};
};

export default useCatalogSelectors;
