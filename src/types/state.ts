import {Promos} from './promo';
import {Cameras, Camera} from './camera';
import {ReviewPost, Reviews} from './review';
import {store} from '../store/store';
import {LoadingStatusType, SortingOrderType, SortingType} from './types';


export type AppCameras = {
  cameras: Cameras,
  camerasFetchStatus: LoadingStatusType,
  searchedCameras: Cameras,
  searchedCamerasFetchStatus: LoadingStatusType,
  sortingCameras: Cameras,
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
  currentSortingType: null | SortingType;
  currentSortingOrder: SortingOrderType;
}

export type AppFilterCameras = {
  categoryCameras: [] | Cameras,
  currentFilterCategory: [] | string[];
  currentFilterType: string[] | [];
  currentFilterLevel: string[]| [];
  filters: any; //TODO
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
