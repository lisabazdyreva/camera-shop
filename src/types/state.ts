import {Promos} from './promo';
import {Cameras, Camera} from './camera';
import {ReviewPost, Reviews} from './review';
import {store} from '../store/store';
import {LoadingStatusType, SortingOrderType, SortingTypesType} from './types';


export type AppCameras = {
  cameras: Cameras,
  camerasFetchStatus: LoadingStatusType,
  searchedCameras: Cameras,
  searchedCamerasFetchStatus: LoadingStatusType,
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
  currentCatalogPage: number;
  camerasTotalCount: number;
  reviewFormData: ReviewPost;
  currentSortingType: null | SortingTypesType;
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

export type AppOrder = {
  basket: [] | Cameras;
  orderPostStatus: LoadingStatusType;
  discount: number | null;
  couponPostStatus: LoadingStatusType;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
