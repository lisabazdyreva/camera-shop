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
  // sortingCameras: Cameras,
  // isSorting: boolean;
  // url: string;
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
  currentSortingOrder: SortingOrderType | null;
  allSorting: string[];
  currentPath: string;
}

export type AppFilterCameras = {
  currentFilterCategory: string[],
  currentFilterType: string[],
  currentFilterLevel: string[],
  minPrice: number,
  maxPrice: number,
  highPrice: number | '',
  lowPrice: number | string,
  allFilters: (string | number)[],
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
