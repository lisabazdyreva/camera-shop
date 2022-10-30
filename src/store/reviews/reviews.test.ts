import {getFakeReviews, UNKNOWN_TYPE} from '../../utils/mocks';
import {LoadingStatus} from '../../utils/const';
import {initialStateReviews, reviews} from './reviews';
import {fetchReviewsAction, postReviewAction} from '../api-actions/api-actions-reviews/api-actions-reviews';
import {AppReviews} from '../../types/state';

const fakeReviews = getFakeReviews();
const state: AppReviews = initialStateReviews;

describe('reducer reviews', () => {
  it('without values should return initial values', () => {
    expect(reviews.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should change loading status when fetch reviews pending', () => {
    expect(reviews.reducer(state, {type: fetchReviewsAction.pending.type}))
      .toEqual({...state, reviewsFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when reviews was loaded', () => {
    expect(reviews.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: fakeReviews}))
      .toEqual({reviews: fakeReviews, reviewsFetchStatus: LoadingStatus.Success, reviewPostStatus: LoadingStatus.Default});
  });

  it('should change loading status when fetch reviews rejected', () => {
    expect(reviews.reducer(state, {type: fetchReviewsAction.rejected.type}))
      .toEqual({...state, reviewsFetchStatus: LoadingStatus.Error});
  });

  it('should change loading status when post review pending', () => {
    expect(reviews.reducer(state, {type: postReviewAction.pending.type}))
      .toEqual({...state, reviewPostStatus: LoadingStatus.Loading});
  });

  it('should change loading status when post review sent', () => {
    expect(reviews.reducer(state, {type: postReviewAction.fulfilled.type}))
      .toEqual({...state, reviewPostStatus: LoadingStatus.Success});
  });

  it('should change loading status when post review rejected', () => {
    expect(reviews.reducer(state, {type: postReviewAction.rejected.type}))
      .toEqual({...state, reviewPostStatus: LoadingStatus.Error});
  });

});
