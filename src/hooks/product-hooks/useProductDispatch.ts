import {useEffect} from 'react';

import {useAppDispatch} from '../index';

import {fetchCameraAction, fetchSimilarCamerasAction} from '../../store/api-actions/api-actions-cameras';
import {fetchReviewsAction} from '../../store/api-actions/api-actions-reviews';


const useProductDispatch = (id: number) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameraAction({id}));
    dispatch(fetchReviewsAction({id}));
    dispatch(fetchSimilarCamerasAction({id}));
  }, [id]);
};

export default useProductDispatch;
