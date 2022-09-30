import {fetchCamera, fetchSimilarCameras} from '../../store/actions/api-actions/api-actions-cameras';
import {fetchReviews} from '../../store/actions/api-actions/api-actions-reviews';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../types/action';
import {useEffect} from 'react';

const useProductDispatch = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCamera(id));
    dispatch(fetchReviews(id));
    dispatch(fetchSimilarCameras(id));
  }, [id]);
};

export default useProductDispatch;
