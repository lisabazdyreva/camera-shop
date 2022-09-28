import { RootState } from '../store/root-reducer';
import {Camera, Review} from './types';
import { LoadingStatus } from './const';


export type AppData = {
  cameras: Camera[],
  camera: Camera | null,
  reviews: Review[],
  similarCameras: Camera[],
}

export type AppStatus = {
  camerasFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
  cameraFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
  reviewsFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
  similarCamerasFetchStatus: typeof LoadingStatus[keyof typeof LoadingStatus],
}

export type State = RootState;
