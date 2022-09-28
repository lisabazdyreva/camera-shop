import { RootState } from '../store/root-reducer';
import {Camera, Promo, Review} from './types';
import { LoadingStatus } from './const';


export type AppData = {
  cameras: Camera[],
  camera: Camera | null,
  reviews: Review[],
  similarCameras: Camera[],
  promos: Promo[],
}

export type AppStatus = {
  camerasFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
  cameraFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
  reviewsFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
  similarCamerasFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
  promosFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
}

export type AppProcess = {
  basket: [] | Camera [];
}

export type State = RootState;
