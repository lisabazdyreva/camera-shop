import {State} from '../../types/state';
import {Cameras} from '../../types/camera';
import {LoadingStatusType} from '../../types/types';

import {NameSpace} from '../../utils/const';

export const getCameras = (state: State): Cameras => state[NameSpace.Cameras].cameras;
export const getCamerasFetchStatus = (state: State): LoadingStatusType => state[NameSpace.Cameras].camerasFetchStatus;
export const getSearchedCameras = (state: State): Cameras => state[NameSpace.Cameras].searchedCameras;
export const getSearchedCamerasFetchStatus = (state: State): LoadingStatusType => state[NameSpace.Cameras].searchedCamerasFetchStatus;
