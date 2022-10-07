import {Promos} from './promo';
import {Cameras, Camera} from './camera';
import {ReviewPost, Reviews} from './review';
import {store} from '../store';
import {LoadingStatusType} from './types';


export type AppCameras = {
  cameras: Cameras,
  camerasFetchStatus: LoadingStatusType,
}

export type AppCamera = {
  camera: Camera | null,
  cameraFetchStatus: LoadingStatusType,
}

export type AppSimilarCameras = {
  similarCameras: Cameras,
  similarCamerasFetchStatus: LoadingStatusType,
}

export type AppPromos = {
  promos: Promos,
  promosFetchStatus: LoadingStatusType,
}

export type AppReviews = {
  reviews: Reviews,
  reviewsFetchStatus: LoadingStatusType,
  reviewPostStatus: LoadingStatusType,
}

export type AppProcess = {
  basket: [] | Cameras;
  currentCatalogPage: number;
  camerasTotalCount: number;
  reviewFormData: ReviewPost;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
