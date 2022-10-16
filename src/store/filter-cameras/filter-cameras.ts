import {AppFilterCameras} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {FilterName, NameSpace} from '../../utils/const';
import {
  fetchHighPriceAction,
  fetchLowPriceAction,
  fetchPricesAction
} from '../api-actions/api-actions-filters/api-actions-filters';

const initialState: AppFilterCameras = {
  filters: [],
  minPrice: 0,
  maxPrice: 0,
  lowPrice: 0,
  highPrice: 0,
  filterUrl: '',
};

export const filterCameras = createSlice({
  name: NameSpace.FilterCameras,
  initialState,
  reducers: {
    resetPrices: (state) => {
      state.lowPrice = 0;
      state.highPrice = 0;
    },
    resetFilters: (state) => {
      state.filters = [];
      state.filterUrl = '';
    },
    setUrl: (state) => {
      state.filterUrl = state.filters.map(({filterName, values}) => values.map((value, index) => {
        if (index === 0) {
          return `${filterName}=${value}`;
        }
        return `&${filterName}=${value}`;
      }).join('')).join('&');
    },
    setCurrentFilter: (state, action) => {
      let values;
      const index = state.filters.findIndex(({filterName}: {filterName: string}) => filterName === action.payload.filter);

      switch (action.payload.filter) {
        case FilterName.HighPrice:
          values = action.payload.filter === FilterName.HighPrice && [state.highPrice];
          break;
        case FilterName.LowPrice:
          values = action.payload.filter === FilterName.LowPrice && [state.lowPrice];
          break;
      }

      if (index === -1) {
        const newFilter = {filterName: action.payload.filter, values: values || [action.payload.value]};
        state.filters = [...state.filters, newFilter];
      } else {
        const updatedItem = {
          filterName: action.payload.filter,
          values: values || [...state.filters[index].values, action.payload.value]
        };
        state.filters = [...state.filters.slice(0, index), updatedItem, ...state.filters.slice(index + 1)];
      }
    },
    removeCurrentFilter: (state, action) => {
      const index = state.filters.findIndex(({filterName}: {filterName: string}) => filterName === action.payload.filter);
      const newValue = state.filters[index].values.filter((value: string) => value !== action.payload.value);

      if (newValue.length) {
        state.filters = [
          ...state.filters.slice(0, index),
          {filterName: action.payload.filter, values: newValue},
          ...state.filters.slice(index + 1)
        ];
      } else {
        state.filters = [...state.filters.slice(0, index), ...state.filters.slice(index + 1)];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPricesAction.fulfilled, (state, action) => {
        state.minPrice = action.payload.lowPrice;
        state.maxPrice = action.payload.highPrice;
        state.highPrice = state.maxPrice;
        state.lowPrice = state.minPrice;
      })
      .addCase(fetchLowPriceAction.fulfilled, (state, action) => {
        state.lowPrice = action.payload.lowPrice;
      })
      .addCase(fetchHighPriceAction.fulfilled, (state, action) => {
        state.highPrice = action.payload.highPrice;
      });
  },
});


export const {setCurrentFilter, removeCurrentFilter, resetFilters, resetPrices, setUrl} = filterCameras.actions;
