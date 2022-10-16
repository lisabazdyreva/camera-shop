import {createSlice} from '@reduxjs/toolkit';

import {AppProcess} from '../../types/state';
import {Camera} from '../../types/camera';

import {
  DefaultValue,
  FORM_ID_TYPE,
  initialReview,
  InputName,
  NameSpace,
  SortingOrder,
  UrlRoute
} from '../../utils/const';


const initialState: AppProcess = {
  basket: [],
  currentCatalogPage: DefaultValue.CatalogPageNumber,
  camerasTotalCount: 0,
  reviewFormData: initialReview,
  currentSortingType: null,
  currentSortingOrder: SortingOrder.Ascending,
  sortingUrl: '',
};

export const process = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setBasket: (state, action) => {
      const camera: Camera = action.payload;
      state.basket = [...state.basket, camera];
    },
    setCurrentPage: (state, action) => {
      state.currentCatalogPage = action.payload;
    },
    setCamerasTotalCount: (state, action) => {
      state.camerasTotalCount = action.payload;
    },
    setCurrentSortingType: (state, action) => {
      state.currentSortingType = action.payload;
    },
    setCurrentSortingOrder: (state, action) => {
      state.currentSortingOrder = action.payload;
    },
    setReviewFormData: (state, action) => {
      switch (action.payload.type) {
        case InputName.Name :
          state.reviewFormData.userName = action.payload.value;
          break;
        case InputName.Advantage:
          state.reviewFormData.advantage = action.payload.value;
          break;
        case InputName.Disadvantage:
          state.reviewFormData.disadvantage = action.payload.value;
          break;
        case InputName.Review:
          state.reviewFormData.review = action.payload.value;
          break;
        case InputName.Rating:
          state.reviewFormData.rating = action.payload.value;
          break;
        case FORM_ID_TYPE:
          state.reviewFormData.cameraId = action.payload.value;
          break;
      }
    },
    cleanForm: (state) => {
      state.reviewFormData = initialState.reviewFormData;
    },
    setSortingUrl: (state) => {
      state.sortingUrl = `${UrlRoute.Sorting}=${state.currentSortingType}&${UrlRoute.Order}=${state.currentSortingOrder}`;
    },
  },
});

export const {
  setBasket,
  setCurrentPage,
  setCurrentSortingType,
  setCurrentSortingOrder,
  setCamerasTotalCount,
  setReviewFormData,
  setSortingUrl,
  cleanForm
} = process.actions;


