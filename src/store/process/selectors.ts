import {State} from '../../types/state';
import {ReviewPost} from '../../types/review';

import {NameSpace} from '../../utils/const';

export const getCurrentPage = (state: State): number => state[NameSpace.App].currentCatalogPage;
export const getCamerasTotalCount = (state: State): number => state[NameSpace.App].camerasTotalCount;
export const getReviewFormData = (state: State): ReviewPost => state[NameSpace.App].reviewFormData;
