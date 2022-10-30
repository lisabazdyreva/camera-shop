import {LoadingStatus} from '../../utils/const';
import {initialStateOrder, order, removeBasketItem, removeBasketItems, setBasketItem, setBasketItems} from './order';
import {getFakeCamera, UNKNOWN_TYPE} from '../../utils/mocks';
import {postCouponAction, postOrderAction} from '../api-actions/api-actions-order/api-actions-order';
import {AppOrder} from '../../types/state';

const state: AppOrder = initialStateOrder;

const fakeCamera = getFakeCamera();

describe('reducer order', () => {
  it('without values should return initial values', () => {
    expect(order.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should set basket item', () => {
    expect(order.reducer(state, setBasketItem(fakeCamera)))
      .toEqual({...state, basket: [fakeCamera]});
  });

  it('should set basket items', () => {
    expect(order.reducer({...state, basket: [fakeCamera]}, setBasketItems({id: fakeCamera.id, amount: 3})))
      .toEqual({...state, basket: [fakeCamera, fakeCamera, fakeCamera]});
  });

  it('should remove basket item', () => {
    expect(order.reducer({...state, basket: [fakeCamera]}, removeBasketItem(fakeCamera.id)))
      .toEqual(state);
  });

  it('should remove basket items', () => {
    expect(order.reducer({...state, basket: [fakeCamera]}, removeBasketItems(fakeCamera.id)))
      .toEqual(state);
  });

  it ('should set loading status when post order pending', () => {
    expect(order.reducer(state, {type: postOrderAction.pending.type}))
      .toEqual({...state, orderPostStatus: LoadingStatus.Loading});
  });

  it ('should set error status when post order rejected', () => {
    expect(order.reducer(state, {type: postOrderAction.rejected.type}))
      .toEqual({...state, orderPostStatus: LoadingStatus.Error});
  });

  it ('should set success status when post order fulfilled and clean state', () => {
    expect(order.reducer({
      basket: [fakeCamera],
      discount: 15,
      orderPostStatus: LoadingStatus.Loading,
      couponPostStatus: LoadingStatus.Success
    }, {type: postOrderAction.fulfilled.type}))
      .toEqual({...state, orderPostStatus: LoadingStatus.Success});
  });

  it ('should set loading status when post coupon pending', () => {
    expect(order.reducer(state, {type: postCouponAction.pending.type}))
      .toEqual({...state, couponPostStatus: LoadingStatus.Loading});
  });

  it ('should set error status when post coupon rejected', () => {
    expect(order.reducer(state, {type: postCouponAction.rejected.type}))
      .toEqual({...state, couponPostStatus: LoadingStatus.Error});
  });

  it ('should set success status when post coupon fulfilled but coupon does not exist', () => {
    expect(order.reducer(state, {type: postCouponAction.fulfilled.type, payload: null}))
      .toEqual({...state, couponPostStatus: LoadingStatus.Success});
  });

  it ('should set success status when post coupon fulfilled and coupon exists', () => {
    expect(order.reducer(state, {type: postCouponAction.fulfilled.type, payload: 15}))
      .toEqual({...state, couponPostStatus: LoadingStatus.Success, discount: 15});
  });

});
