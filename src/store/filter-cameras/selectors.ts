import {State} from '../../types/state';
import {NameSpace} from '../../utils/const';
import {Cameras} from '../../types/camera';

export const getFilterCameras = (state: State): Cameras => state[NameSpace.FilterCameras].categoryCameras;

export const getCurrentFilterCategory = (state: State): string[] => state[NameSpace.FilterCameras].currentFilterCategory;
export const getCurrentFilterType = (state: State): string[] => state[NameSpace.FilterCameras].currentFilterType;
export const getCurrentFilterLevel = (state: State): string[] => state[NameSpace.FilterCameras].currentFilterLevel;
export const getFilters = (state: State): string[] => state[NameSpace.FilterCameras].filters;
