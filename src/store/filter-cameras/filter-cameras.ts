import {createSlice} from '@reduxjs/toolkit';
import {AppFilterCameras} from '../../types/state';

import {QueryRoute, NameSpace} from '../../utils/const';
import {fetchHighPriceAction, fetchLowPriceAction, fetchPricesAction} from '../api-actions/api-actions-filters/api-actions-filters';

export const initialStateFilters: AppFilterCameras = {
  currentFilterCategory: [],
  currentFilterType: [],
  currentFilterLevel: [],
  allFilters: [],
  minPrice: 0,
  maxPrice: 0,
  lowPrice: '',
  highPrice: '',
};

export const filterCameras = createSlice({
  name: NameSpace.FilterCameras,
  initialState: initialStateFilters,
  reducers: {
    resetFilters: (state) => {
      state.allFilters = [];
      state.currentFilterCategory = [];
      state.currentFilterLevel = [];
      state.currentFilterType = [];
      state.lowPrice = '';
      state.highPrice = '';
    },
    setCurrentFilter: (state, action) => {
      switch (action.payload.filter) {
        case(QueryRoute.Category): {
          state.currentFilterCategory = [...state.currentFilterCategory, action.payload.value];
          state.allFilters.push(action.payload.value);
          break;
        }
        case (QueryRoute.Type): {
          state.currentFilterType = [...state.currentFilterType, action.payload.value];
          state.allFilters.push(action.payload.value);
          break;
        }
        case (QueryRoute.Level): {
          state.currentFilterLevel = [...state.currentFilterLevel, action.payload.value];
          state.allFilters.push(action.payload.value);
          break;
        }
      }
    },
    removeCurrentFilter: (state, action) => {
      switch (action.payload.filter) {
        case (QueryRoute.Category): {
          state.currentFilterCategory = state.currentFilterCategory.filter((category) => category !== action.payload.value);
          state.allFilters = state.allFilters.filter((item) => item !== action.payload.value);
          break;
        }
        case (QueryRoute.Type): {
          state.currentFilterType = state.currentFilterType.filter((type) => type !== action.payload.value);
          state.allFilters = state.allFilters.filter((item) => item !== action.payload.value);
          break;
        }
        case (QueryRoute.Level): {
          state.currentFilterLevel = state.currentFilterLevel.filter((level) => level !== action.payload.value);
          state.allFilters = state.allFilters.filter((item) => item !== action.payload.value);
          break;
        }
      }
    },
    setLowPrice: (state, action) => {
      state.allFilters = state.allFilters.filter((item) => item !== state.lowPrice);
      state.lowPrice = action.payload.value === '' ? action.payload.value : Number(action.payload.value);
      state.allFilters.push(state.lowPrice);
    },
    setHighPrice: (state, action) => {
      state.allFilters = state.allFilters.filter((item) => item !== state.highPrice);
      state.highPrice = action.payload.value === '' ? action.payload.value : Number(action.payload.value);
      state.allFilters.push(state.highPrice);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPricesAction.fulfilled, (state, action) => {
        state.minPrice = action.payload.minPrice;
        state.maxPrice = action.payload.maxPrice;
      })
      .addCase(fetchLowPriceAction.fulfilled, (state, action) => {
        state.allFilters = state.allFilters.filter((item) => item !== state.lowPrice);
        state.lowPrice = action.payload.lowPrice;
        state.allFilters.push(state.lowPrice);
      })
      .addCase(fetchHighPriceAction.fulfilled, (state, action) => {
        state.allFilters = state.allFilters.filter((item) => item !== state.highPrice);
        state.highPrice = action.payload.highPrice;
        state.allFilters.push(state.highPrice);
      });
  },
});


export const {setCurrentFilter, removeCurrentFilter, resetFilters, setLowPrice, setHighPrice} = filterCameras.actions;
