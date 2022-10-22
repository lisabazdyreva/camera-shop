import {State} from '../../types/state';
import {NameSpace} from '../../utils/const';

export const getMaxPrice = (state: State): number => state[NameSpace.FilterCameras].maxPrice;
export const getMinPrice = (state: State): number => state[NameSpace.FilterCameras].minPrice;

export const getLowPrice = (state: State): number | string => state[NameSpace.FilterCameras].lowPrice;
export const getHighPrice = (state: State): number | string => state[NameSpace.FilterCameras].highPrice;

export const getCurrentFilterCategory = (state: State): string[] => state[NameSpace.FilterCameras].currentFilterCategory;
export const getCurrentFilterType = (state: State): string[] => state[NameSpace.FilterCameras].currentFilterType;
export const getCurrentFilterLevel = (state: State): string[] => state[NameSpace.FilterCameras].currentFilterLevel;

export const getAllFilters = (state: State): (string | number)[] => state[NameSpace.FilterCameras].allFilters;
