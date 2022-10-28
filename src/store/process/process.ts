import {createSlice} from '@reduxjs/toolkit';

import {AppProcess} from '../../types/state';
import {Camera} from '../../types/camera';
import {DefaultValue, FORM_ID_TYPE, initialReview, InputName, NameSpace} from '../../utils/const';


export const initialStateApp: AppProcess = {
  basket: [],
  currentCatalogPage: DefaultValue.CatalogPageNumber,
  camerasTotalCount: 0,
  reviewFormData: initialReview,
  currentSortingType: null,
  currentSortingOrder: null,
  allSorting: [],
  currentPath: '',
};

export const process = createSlice({
  name: NameSpace.App,
  initialState: initialStateApp,
  reducers: {
    setBasketItem: (state, action) => {
      const camera: Camera = action.payload;
      state.basket = [...state.basket, camera];
      state.basket = state.basket.sort((cameraA, cameraB) => cameraA.id - cameraB.id);
    },
    setBasketItems: (state, action) => {
      const item = state.basket.find((camera) => camera.id === action.payload.id);
      state.basket = state.basket.filter((camera) => camera.id !== action.payload.id);

      const newItems = new Array(action.payload.amount).fill(item);
      state.basket.push(...newItems);
    },
    removeBasketItem: (state, action) => {
      const index = state.basket.findIndex((camera) => camera.id === action.payload);
      state.basket = [...state.basket.slice(0, index), ...state.basket.slice(index + 1)];
    },
    removeBasketItems: (state, action) => {
      state.basket = state.basket.filter((camera) => camera.id !== action.payload);
    },
    cleanBasket: (state) => {
      state.basket = [];
    },
    setCurrentPage: (state, action) => {
      state.currentCatalogPage = action.payload;
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
    setCamerasTotalCount: (state, action) => {
      state.camerasTotalCount = action.payload;
    },
    resetSorting: (state) => {
      state.currentSortingType = null;
      state.currentSortingOrder = null;
      state.allSorting = [];
    },
    setCurrentSortingType: (state, action) => {
      state.allSorting = state.allSorting.filter((sorting) => sorting !== state.currentSortingType);
      state.currentSortingType = action.payload;
      if (state.currentSortingType) {
        state.allSorting.push(state.currentSortingType);
      }
    },
    setCurrentSortingOrder: (state, action) => {
      state.allSorting = state.allSorting.filter((sorting) => sorting !== state.currentSortingOrder);
      state.currentSortingOrder = action.payload;
      if (state.currentSortingOrder) {
        state.allSorting.push(state.currentSortingOrder);
      }
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
      state.reviewFormData = initialStateApp.reviewFormData;
    },
  },
});

export const {
  setBasketItem,
  setBasketItems,
  removeBasketItem,
  removeBasketItems,
  cleanBasket,
  setCurrentPage,
  setCurrentSortingType,
  setCurrentSortingOrder,
  setCamerasTotalCount,
  setReviewFormData,
  cleanForm,
  resetSorting,
  setCurrentPath,
} = process.actions;


