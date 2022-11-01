import {createSlice} from '@reduxjs/toolkit';

import {AppOrder} from '../../types/state';
import {Camera} from '../../types/camera';
import {LoadingStatus, NameSpace} from '../../utils/const';

import {postCouponAction, postOrderAction} from '../api-actions/api-actions-order/api-actions-order';


export const initialStateOrder: AppOrder = {
  basket: [],
  orderPostStatus: LoadingStatus.Default,
  discount: null,
  couponPostStatus: LoadingStatus.Default,
};

export const order = createSlice({
  name: NameSpace.Order,
  initialState: initialStateOrder,
  reducers: {
    setBasketItem: (state, action) => {
      const camera: Camera = action.payload;
      state.basket = [...state.basket, camera];
      state.basket = state.basket.sort((cameraA, cameraB) => cameraA.id - cameraB.id);
    },
    setBasketItems: (state, action) => {
      const item = state.basket.find((camera) => camera.id === action.payload.id);
      const index = state.basket.findIndex((camera) => camera.id === action.payload.id);

      const newItems = new Array(action.payload.amount).fill(item);
      state.basket = [...state.basket.slice(0 , index), ...newItems, ...state.basket.slice(index + 1)];
    },
    removeBasketItem: (state, action) => {
      const index = state.basket.findIndex((camera) => camera.id === action.payload);
      state.basket = [...state.basket.slice(0, index), ...state.basket.slice(index + 1)];
    },
    removeBasketItems: (state, action) => {
      state.basket = state.basket.filter((camera) => camera.id !== action.payload);
    },
  },
  extraReducers (builder) {
    builder
      .addCase(postOrderAction.fulfilled, (state) => {
        state.orderPostStatus = LoadingStatus.Success;
        state.basket = [];
        state.discount = null;
        state.couponPostStatus = LoadingStatus.Default;
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

export const {setBasketItem, setBasketItems, removeBasketItem, removeBasketItems} = order.actions;
