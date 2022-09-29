import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { store } from '../index';
import { State} from './state';

export enum ActionType {
  SetCameras = 'data/setCameras',
  SetCamera = 'data/setCamera',
  SetReviews = 'data/setReviews',
  SetSimilarCameras = 'data/setSimilarCameras',
  SetPromos = 'data/setPromos',
  SetBasket = 'app/setBasket',
  SetCurrentPage = 'app/setCurrentPage',
  SetFetchCamerasStatus = 'status/setFetchCamerasStatus',
  SetFetchCameraStatus = 'status/setFetchCameraStatus',
  SetFetchReviewsStatus = 'status/setFetchReviewsStatus',
  SetFetchSimilarCamerasStatus = 'status/setFetchSimilarCamerasStatus',
  SetFetchPromosStatus = 'status/setFetchPromosStatus',
}

export type ThunkActionResult<P = Promise<void>> = ThunkAction<P, State, unknown, Action>;
export type AppDispatch = typeof store.dispatch;

