import {createSlice} from '@reduxjs/toolkit';

import {AppPromos} from '../../types/state';
import {LoadingStatus, NameSpace} from '../../utils/const';

import {fetchPromosAction} from '../api-actions/api-actions-promo';


const initialState: AppPromos = {
  promos: [],
  promosFetchStatus: LoadingStatus.Default,
};

export const appPromos = createSlice({
  name: NameSpace.Promos,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromosAction.pending, (state) => {
        state.promosFetchStatus = LoadingStatus.Loading;
      })
      .addCase(fetchPromosAction.fulfilled, (state, action) => {
        state.promos = action.payload;
        state.promosFetchStatus = LoadingStatus.Success;
      })
      .addCase(fetchPromosAction.rejected, (state) => {
        state.promosFetchStatus = LoadingStatus.Error;
      });
  },
});
