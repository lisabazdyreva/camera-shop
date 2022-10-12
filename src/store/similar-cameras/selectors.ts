import {State} from '../../types/state';
import {Cameras} from '../../types/camera';
import {LoadingStatusType} from '../../types/types';

import {NameSpace} from '../../utils/const';

export const getSimilarCameras = (state: State): Cameras => state[NameSpace.SimilarCameras].similarCameras;
export const getSimilarCamerasFetchStatus = (state: State): LoadingStatusType => state[NameSpace.SimilarCameras].similarCamerasFetchStatus;

