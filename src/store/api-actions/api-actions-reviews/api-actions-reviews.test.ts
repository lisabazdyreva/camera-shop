import {
  getFakeID,
  getFakePostReview,
  getFakeReviews,
  mockAPI,
  mockStore,
} from '../../../utils/mocks';
import {UrlRoute} from '../../../utils/const';
import {fetchReviewsAction, postReviewAction} from './api-actions-reviews';


const fakeReviews = getFakeReviews();
const fakeId = getFakeID();
const fakePostReview = getFakePostReview();


describe('async review action', () => {
  it('should dispatch fetch reviews', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}${UrlRoute.Reviews}`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction({id: fakeId}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
  });

  it('should react when dispatch fetch reviews error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}${UrlRoute.Reviews}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction({id: fakeId}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
  });

  it('should dispatch post review action', async () => {
    mockAPI
      .onPost(`${UrlRoute.Base}${UrlRoute.Reviews}`)
      .reply(200);

    const store = mockStore();
    await store.dispatch(postReviewAction(fakePostReview));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);
  });

  it('should react when post review error', async () => {
    mockAPI
      .onPost(`${UrlRoute.Base}${UrlRoute.Reviews}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(postReviewAction(fakePostReview));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
  });
});
