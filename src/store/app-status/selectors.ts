import {State} from '../../types/state';
import {NameSpace} from '../../utils/const';

export const getPromosFetchStatus = (state: State) => state[NameSpace.Status].promosFetchStatus;
export const getCamerasFetchStatus = (state: State) => state[NameSpace.Status].camerasFetchStatus;
export const getCameraFetchStatus = (state: State) => state[NameSpace.Status].cameraFetchStatus;
export const getSimilarCamerasFetchStatus = (state: State) => state[NameSpace.Status].similarCamerasFetchStatus;
export const getReviewsFetchStatus = (state: State) => state[NameSpace.Status].reviewsFetchStatus;
export const getReviewPostStatus = (state: State) => state[NameSpace.Status].reviewPostStatus;
