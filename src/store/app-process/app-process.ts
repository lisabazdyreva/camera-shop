import {AppProcess} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {setBasket, setCurrentPage} from '../actions/actions';
import {DefaultValue} from '../../utils/const';

const initialState: AppProcess = {
  basket: [],
  currentCatalogPage: DefaultValue.CatalogPageNumber,
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
