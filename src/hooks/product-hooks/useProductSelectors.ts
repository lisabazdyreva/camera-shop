import {useSelector} from 'react-redux';
import {getCamera, getReviews, getSimilarCameras} from '../../store/app-data/selectors';

const useProductSelectors = () => {
  const camera = useSelector(getCamera);
  const reviews = useSelector(getReviews);
  const similarCameras = useSelector(getSimilarCameras);

  return {camera, reviews, similarCameras};
};

export default useProductSelectors;
