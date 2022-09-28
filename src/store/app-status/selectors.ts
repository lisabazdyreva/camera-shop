import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';

export const getPromosFetchStatus = (state: State) => state[NameSpace.Status].promosFetchStatus;
export const getCamerasFetchStatus = (state: State) => state[NameSpace.Status].camerasFetchStatus;
