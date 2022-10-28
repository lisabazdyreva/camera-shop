import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../../types/state';
import {AxiosInstance, AxiosError} from 'axios';
import {UrlRoute} from '../../../utils/const';
//eslint-disable-next-line
import {Coupon, Order} from '../../../types/order';

export const postOrderAction = createAsyncThunk<undefined, Order, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'order/postOrder',
  async (order, {extra: api}) => {
    await api.post(`${UrlRoute.Base}${UrlRoute.Orders}`, order);
    //eslint-disable-next-line
    // console.log(response);
    return undefined;
  },
);


export const postCouponAction = createAsyncThunk<number, Coupon, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'order/postCoupon',
  async (_arg, {extra: api}) => {
    try {
      const response = await api.post(`${UrlRoute.Base}${UrlRoute.Coupons}`, _arg);
      return response.data;
    } catch (err) {
      const status = (err as AxiosError)?.response?.status;

      if (status === 400) {
        return null;
      }
      throw new Error();
    }
    //404 - ошибка
    //400 - такого нет
    //'camera-555' | 'camera-444' | 'camera-333'
  },
);

