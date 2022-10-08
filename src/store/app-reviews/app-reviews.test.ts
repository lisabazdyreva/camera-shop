import {makeFakeReview} from '../../utils/mocks';
import {LoadingStatus} from '../../utils/const';
import {appReviews} from './app-reviews';
import {fetchReviewsAction} from '../api-actions/api-actions-reviews';

const reviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];

describe('reducer app-reviews', () => {
  const state = {reviews: [], reviewsFetchStatus: LoadingStatus.Default, reviewPostStatus: LoadingStatus.Default};

  it('without values should return initial values', () => {
    expect(appReviews.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(appReviews.reducer(state, {type: fetchReviewsAction.pending.type}))
      .toEqual({...state, reviewsFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(appReviews.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({reviews, reviewsFetchStatus: LoadingStatus.Success, reviewPostStatus: LoadingStatus.Default});
  });

  it('should change loading status when rejected', () => {
    expect(appReviews.reducer(state, {type: fetchReviewsAction.rejected.type}))
      .toEqual({...state, reviewsFetchStatus: LoadingStatus.Error});
  });
  //TODO POST
});
