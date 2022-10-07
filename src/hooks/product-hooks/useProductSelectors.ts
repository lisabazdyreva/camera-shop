import {useSelector} from 'react-redux';

import {getCamera, getCameraFetchStatus} from '../../store/app-camera/selectors';
import {getSimilarCameras, getSimilarCamerasFetchStatus} from '../../store/app-similar-cameras/selectors';
import {getReviewsFetchStatus} from '../../store/app-reviews/selectors';


const useProductSelectors = () => {
  const camera = useSelector(getCamera);
  const similarCameras = useSelector(getSimilarCameras);

  const cameraFetchStatus = useSelector(getCameraFetchStatus);
  const similarCamerasFetchStatus = useSelector(getSimilarCamerasFetchStatus);
  const reviewsFetchStatus = useSelector(getReviewsFetchStatus);


  return {camera, similarCameras, cameraFetchStatus, similarCamerasFetchStatus, reviewsFetchStatus};
};

export default useProductSelectors;
