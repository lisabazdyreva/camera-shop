import {getFakeReviews, UNKNOWN_TYPE} from '../../utils/mocks';
import {LoadingStatus} from '../../utils/const';
import {appReviews} from './app-reviews';
import {fetchReviewsAction, postReviewAction} from '../api-actions/api-actions-reviews/api-actions-reviews';
import {AppReviews} from '../../types/state';

const reviews = getFakeReviews();
const state: AppReviews = {reviews: [], reviewsFetchStatus: LoadingStatus.Default, reviewPostStatus: LoadingStatus.Default};

describe('reducer app-reviews', () => {
  it('without values should return initial values', () => {
    expect(appReviews.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should change loading status when fetch reviews pending', () => {
    expect(appReviews.reducer(state, {type: fetchReviewsAction.pending.type}))
      .toEqual({...state, reviewsFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when reviews was loaded', () => {
    expect(appReviews.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({reviews, reviewsFetchStatus: LoadingStatus.Success, reviewPostStatus: LoadingStatus.Default});
  });

  it('should change loading status when fetch reviews rejected', () => {
    expect(appReviews.reducer(state, {type: fetchReviewsAction.rejected.type}))
      .toEqual({...state, reviewsFetchStatus: LoadingStatus.Error});
  });

  it('should change loading status when post review pending', () => {
    expect(appReviews.reducer(state, {type: postReviewAction.pending.type}))
      .toEqual({...state, reviewPostStatus: LoadingStatus.Loading});
  });

  it('should change loading status when post review sent', () => {
    expect(appReviews.reducer(state, {type: postReviewAction.fulfilled.type}))
      .toEqual({...state, reviewPostStatus: LoadingStatus.Success});
  });

  it('should change loading status when post review rejected', () => {
    expect(appReviews.reducer(state, {type: postReviewAction.rejected.type}))
      .toEqual({...state, reviewPostStatus: LoadingStatus.Error});
  });

});
