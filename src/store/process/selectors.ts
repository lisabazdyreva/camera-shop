import {State} from '../../types/state';
import {ReviewPost} from '../../types/review';

import {NameSpace} from '../../utils/const';
import {SortingOrderType, SortingTypesType} from '../../types/types';

export const getCurrentPage = (state: State): number => state[NameSpace.App].currentCatalogPage;
export const getCamerasTotalCount = (state: State): number => state[NameSpace.App].camerasTotalCount;
export const getReviewFormData = (state: State): ReviewPost => state[NameSpace.App].reviewFormData;

export const getCurrentSortingType = (state: State): SortingTypesType | null => state[NameSpace.App].currentSortingType;
export const getCurrentSortingOrder = (state: State): SortingOrderType | null => state[NameSpace.App].currentSortingOrder;

export const getAllSorting = (state: State): string[] => state[NameSpace.App].allSorting;
export const getCurrentPath = (state: State): string => state[NameSpace.App].currentPath;
