import {AppFilterCameras} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../utils/const';
import {fetchCategoryCameraAction} from '../api-actions/api-actions-filters/api-actions-filters';

const initialState: AppFilterCameras = {
  categoryCameras: [],
  currentFilterCategory: [],
  currentFilterType: [],
  currentFilterLevel: [],
  filters: [],
};

export const filterCameras = createSlice({
  name: NameSpace.FilterCameras,
  initialState,
  reducers: {
    cleanCategoryCameras: (state) => {
      state.categoryCameras = [];
    },
    setCurrentFilter: (state, action) => {
      const index = state.filters.findIndex(({filterName}: {filterName: string}) => filterName === action.payload.filter);

      const updateFilters = (values: string[]) => {
        if (index === -1) {
          state.filters = [...state.filters, {filterName: action.payload.filter, values}];
        } else {
          state.filters = [...state.filters.slice(0, index), {filterName: action.payload.filter, values}, ...state.filters.slice(index + 1)];
        }
      };

      switch (action.payload.filter) {
        case('category'): {
          state.currentFilterCategory = [...state.currentFilterCategory, action.payload.value];
          updateFilters(state.currentFilterCategory);
          break;
        }
        case ('type'): {
          state.currentFilterType = [...state.currentFilterType, action.payload.value];
          updateFilters(state.currentFilterType);
          break;
        }
        case ('level'): {
          state.currentFilterLevel = [...state.currentFilterLevel, action.payload.value];
          updateFilters(state.currentFilterLevel);
          break;
        }
      }

    },
    removeCurrentFilter: (state, action) => {
      const index = state.filters.findIndex(({filterName}: {filterName: string}) => filterName === action.payload.filter);

      const updateFilters = (values: string[]) => {
        if (values.length) {
          state.filters = [...state.filters.slice(0, index), {filterName: action.payload.filter, values}, ...state.filters.slice(index + 1)];
        } else {
          state.filters = [...state.filters.slice(0, index), ...state.filters.slice(index + 1)];
        }
      };

      switch (action.payload.filter) {
        case ('category'): {
          state.currentFilterCategory = state.currentFilterCategory.filter((category) => category !== action.payload.value);
          updateFilters(state.currentFilterCategory);
          break;
        }
        case ('type'): {
          state.currentFilterType = state.currentFilterType.filter((type) => type !== action.payload.value);
          updateFilters(state.currentFilterType);
          break;
        }
        case ('level'): {
          state.currentFilterLevel = state.currentFilterLevel.filter((level) => level !== action.payload.value);
          updateFilters(state.currentFilterLevel);
          break;
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategoryCameraAction.fulfilled, (state, action) => {
        state.categoryCameras = action.payload;
      });
  },
});


export const {cleanCategoryCameras, setCurrentFilter, removeCurrentFilter} = filterCameras.actions;
