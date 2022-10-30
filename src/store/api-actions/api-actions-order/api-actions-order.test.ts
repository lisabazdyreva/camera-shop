import {mockAPI, mockStore} from '../../../utils/mocks';
import {UrlRoute} from '../../../utils/const';
import {postCouponAction, postOrderAction} from './api-actions-order';
import {Order} from '../../../types/order';

const fakeOrder: Order = {
  camerasIds:[1, 2, 3],
  coupon: null,
};

const fakeCoupon = {coupon: 'camera-444'};

describe('async order action', () => {
  it('should dispatch post order', async () => {
    mockAPI
      .onPost(`${UrlRoute.Base}${UrlRoute.Orders}`)
      .reply(200);

    const store = mockStore();
    await store.dispatch(postOrderAction(fakeOrder));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        postOrderAction.pending.type,
        postOrderAction.fulfilled.type,
      ]);
  });

  it('should react when post order error', async () => {
    mockAPI
      .onPost(`${UrlRoute.Base}${UrlRoute.Orders}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(postOrderAction(fakeOrder));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        postOrderAction.pending.type,
        postOrderAction.rejected.type,
      ]);
  });

  it('should dispatch post coupon', async () => {
    mockAPI
      .onPost(`${UrlRoute.Base}${UrlRoute.Coupons}`)
      .reply(200);

    const store = mockStore();
    await store.dispatch(postCouponAction(fakeCoupon));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        postCouponAction.pending.type,
        postCouponAction.fulfilled.type,
      ]);
  });

  it('should react when post coupon error', async () => {
    mockAPI
      .onPost(`${UrlRoute.Base}${UrlRoute.Coupons}`)
      .reply(404);

    const store = mockStore();
    await store.dispatch(postCouponAction(fakeCoupon));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        postCouponAction.pending.type,
        postCouponAction.rejected.type,
      ]);
  });

});
