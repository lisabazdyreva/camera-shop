import {AppProcess} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {setBasket} from '../actions/actions';

const initialState: AppProcess = {
  basket: [],
};

export const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setBasket, (state, action) => {
      const selectedCamera = action.payload;
      state.basket = [...state.basket, selectedCamera];
    });
});
