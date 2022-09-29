import {AppProcess} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {setBasket, setCurrentPage} from '../actions/actions';

const initialState: AppProcess = {
  basket: [],
  currentCatalogPage: 1, // TODO remove magic value
};

export const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setBasket, (state, action) => {
      const selectedCamera = action.payload;
      state.basket = [...state.basket, selectedCamera];
    })
    .addCase(setCurrentPage, (state, action) => {
      state.currentCatalogPage = action.payload;
    });
});
