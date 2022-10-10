import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import { ReviewPost, Reviews} from '../../../types/review';
import {AppDispatch, State} from '../../../types/state';

import {UrlRoute} from '../../../utils/const';
import {sortReviews} from '../../../utils/utils';
import {cleanForm} from '../../app-process/app-process';


export const fetchReviewsAction = createAsyncThunk<Reviews, {id: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'reviews/fetchReviews',
  async ({id}, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${UrlRoute.Base}${UrlRoute.Cameras}/${id}${UrlRoute.Reviews}`);
    return sortReviews(data);
  },
);


export const postReviewAction = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'reviews/postReview',
  async (data: ReviewPost, {dispatch, extra: api}) => {
    const response = await api.post(`${UrlRoute.Base}${UrlRoute.Reviews}`, data);

    if (response.statusText === 'Created') {
      await dispatch(fetchReviewsAction({id: data.cameraId}));
      dispatch(cleanForm());
    }
  },
);
