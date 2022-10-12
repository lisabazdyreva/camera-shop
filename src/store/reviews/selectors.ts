import {State} from '../../types/state';
import {Reviews} from '../../types/review';
import {LoadingStatusType} from '../../types/types';

import {NameSpace} from '../../utils/const';

export const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const getReviewsFetchStatus = (state: State): LoadingStatusType => state[NameSpace.Reviews].reviewsFetchStatus;
export const getReviewPostStatus = (state: State): LoadingStatusType => state[NameSpace.Reviews].reviewPostStatus;
