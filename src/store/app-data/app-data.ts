import {AppData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {setCamera, setCameras, setPromos, setReviews, setSimilarCameras} from '../actions/actions';

const initialState: AppData = {
  cameras: [],
  camera: null,
  reviews: [],
  similarCameras: [],
  promos: [],
};

export const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(setCameras, (state, action) => {
      state.cameras = action.payload;
    })
    .addCase(setCamera, (state, action) => {
      state.camera = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSimilarCameras, (state, action) => {
      state.similarCameras = action.payload;
    })
    .addCase(setPromos, (state, action) => {
      // const promo = action.payload;
      state.promos = action.payload;
    });
});
