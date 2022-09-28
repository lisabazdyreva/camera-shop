import {State} from '../../types/state';
import {Camera, Promo, Review} from '../../types/types';
import {NameSpace} from '../../utils/const';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamera = (state: State): Camera | null => state[NameSpace.Data].camera;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Data].similarCameras;
export const getPromos = (state: State): Promo[] => state[NameSpace.Data].promos;
