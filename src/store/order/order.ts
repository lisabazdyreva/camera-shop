import {AppOrder} from '../../types/state';
import {LoadingStatus, NameSpace} from '../../utils/const';
import {createSlice} from '@reduxjs/toolkit';
import {postCouponAction, postOrderAction} from '../api-actions/api-actions-order/api-actions-order';

const initialStateOrder: AppOrder = {
  orderPostStatus: LoadingStatus.Default,
  discount: null,
  couponPostStatus: LoadingStatus.Default,
};

export const order = createSlice({
  name: NameSpace.Order,
  initialState: initialStateOrder,
  reducers: {
    cleanDiscount: (state) => {
      state.discount = null;
      state.couponPostStatus = LoadingStatus.Default;
    },
  },
  extraReducers (builder) {
    builder
      .addCase(postOrderAction.fulfilled, (state) => {
        state.orderPostStatus = LoadingStatus.Success;
      })
      .addCase(postOrderAction.pending, (state) => {
        state.orderPostStatus = LoadingStatus.Loading;
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.orderPostStatus = LoadingStatus.Error;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.couponPostStatus = LoadingStatus.Success;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.couponPostStatus = LoadingStatus.Error;
      })
      .addCase(postCouponAction.pending, (state) => {
        state.couponPostStatus = LoadingStatus.Loading;
      });
  },
});

export const {cleanDiscount} = order.actions;
