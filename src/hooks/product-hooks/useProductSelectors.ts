import {useSelector} from 'react-redux';
import {getCamera, getReviews, getSimilarCameras} from '../../store/app-data/selectors';
import {
  getCameraFetchStatus,
  getReviewsFetchStatus,
  getSimilarCamerasFetchStatus
} from '../../store/app-status/selectors';

const useProductSelectors = () => {
  const camera = useSelector(getCamera);
  const reviews = useSelector(getReviews);
  const similarCameras = useSelector(getSimilarCameras);

  const cameraFetchStatus = useSelector(getCameraFetchStatus);
  const similarCamerasFetchStatus = useSelector(getSimilarCamerasFetchStatus);
  const reviewsFetchStatus = useSelector(getReviewsFetchStatus);


  return {camera, reviews, similarCameras, cameraFetchStatus, similarCamerasFetchStatus, reviewsFetchStatus};
};

export default useProductSelectors;
