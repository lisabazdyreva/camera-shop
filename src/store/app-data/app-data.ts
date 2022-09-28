import {AppData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {setCamera, setCameras, setReviews, setSimilarCameras} from '../actions/actions';

const initialState: AppData = {
  cameras: [],
  camera: null,
  reviews: [],
  similarCameras: [],
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
    });
});
