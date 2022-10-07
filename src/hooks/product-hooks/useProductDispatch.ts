import {fetchCameraAction, fetchSimilarCamerasAction} from '../../store/api-actions/api-actions-cameras';
import {fetchReviewsAction} from '../../store/api-actions/api-actions-reviews';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../types/state';
import {useEffect} from 'react';

const useProductDispatch = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCameraAction({id}));
    dispatch(fetchReviewsAction({id}));
    dispatch(fetchSimilarCamerasAction({id}));
  }, [id]);
};

export default useProductDispatch;
