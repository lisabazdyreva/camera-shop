import {State} from '../../types/state';
import {NameSpace} from '../../utils/const';

export const getMaxPrice = (state: State): number => state[NameSpace.FilterCameras].maxPrice;
export const getMinPrice = (state: State): number => state[NameSpace.FilterCameras].minPrice;
export const getLowPrice = (state: State): number => state[NameSpace.FilterCameras].lowPrice;
export const getHighPrice = (state: State): number => state[NameSpace.FilterCameras].highPrice;

export const getFilterUrl = (state: State): string => state[NameSpace.FilterCameras].filterUrl;
