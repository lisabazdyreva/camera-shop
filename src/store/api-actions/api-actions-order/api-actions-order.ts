import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance, AxiosError} from 'axios';

import {NOT_FOUND_ERROR_STATUS, UrlRoute} from '../../../utils/const';

import {AppDispatch, State} from '../../../types/state';
import {Coupon, Order} from '../../../types/order';

export const postOrderAction = createAsyncThunk<void, Order, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'order/postOrder',
  async (order, {extra: api}) => {
    await api.post(`${UrlRoute.Base}${UrlRoute.Orders}`, order);
    //TODO потестировать на ошибки и этот undefined?
  },
);


export const postCouponAction = createAsyncThunk<number, Coupon, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'order/postCoupon',
  async (coupon, {extra: api}) => {
    try {
      const response = await api.post(`${UrlRoute.Base}${UrlRoute.Coupons}`, coupon);
      return response.data;
    } catch (err) {
      const status = (err as AxiosError)?.response?.status;

      if (status === NOT_FOUND_ERROR_STATUS) {
        return null;
      }
      throw new Error();
    }
  },
);

