import {State} from '../../types/state';
import {Camera} from '../../types/camera';
import {LoadingStatusType} from '../../types/types';

import {NameSpace} from '../../utils/const';

export const getCamera = (state: State): Camera | null => state[NameSpace.Camera].camera;
export const getCameraFetchStatus = (state: State): LoadingStatusType => state[NameSpace.Camera].cameraFetchStatus;
