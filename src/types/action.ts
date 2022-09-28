import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { store } from '../index';
import { State} from './state';

export enum ActionType {
  SetCameras = 'data/setCameras',
  SetCamera = 'data/setCamera',
  SetReviews = 'data/setReviews',
  SetSimilarCameras = 'data/setSimilarCameras',
  SetBasket= 'app/setBasket',
  SetFetchCamerasStatus = 'status/setFetchCamerasStatus',
  SetFetchCameraStatus = 'status/setFetchCameraStatus',
  SetFetchReviewsStatus = 'status/setFetchReviewsStatus',
  SetFetchSimilarCamerasStatus = 'status/setFetchSimilarCamerasStatus',
}

export type ThunkActionResult<P = Promise<void>> = ThunkAction<P, State, unknown, Action>;
export type AppDispatch = typeof store.dispatch;

