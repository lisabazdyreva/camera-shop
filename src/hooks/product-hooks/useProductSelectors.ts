import {useAppSelector} from '../index';

import {getCamera, getCameraFetchStatus} from '../../store/app-camera/selectors';
import {getSimilarCameras, getSimilarCamerasFetchStatus} from '../../store/app-similar-cameras/selectors';
import {getReviewsFetchStatus} from '../../store/app-reviews/selectors';


const useProductSelectors = () => {
  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);

  const cameraFetchStatus = useAppSelector(getCameraFetchStatus);
  const similarCamerasFetchStatus = useAppSelector(getSimilarCamerasFetchStatus);
  const reviewsFetchStatus = useAppSelector(getReviewsFetchStatus);


  return {camera, similarCameras, cameraFetchStatus, similarCamerasFetchStatus, reviewsFetchStatus};
};

export default useProductSelectors;
