import {AppStatus} from '../../types/state';
import {LoadingStatus} from '../../types/const';
import {createReducer} from '@reduxjs/toolkit';
import {
  setFetchCamerasStatus,
  setFetchCameraStatus,
  setFetchReviewsStatus,
  setFetchSimilarCamerasStatus
} from '../actions/actions';

const initialState: AppStatus = {
  camerasFetchStatus: LoadingStatus.Default,
  cameraFetchStatus: LoadingStatus.Default,
  reviewsFetchStatus: LoadingStatus.Default,
  similarCamerasFetchStatus: LoadingStatus.Default
};

export const appStatus = createReducer(initialState, (builder) => {
  builder
    .addCase(setFetchCamerasStatus, (state, action) => {
      state.camerasFetchStatus = action.payload;
    })
    .addCase(setFetchCameraStatus, (state, action) => {
      state.cameraFetchStatus = action.payload;
    })
    .addCase(setFetchReviewsStatus, (state, action) => {
      state.reviewsFetchStatus = action.payload;
    })
    .addCase(setFetchSimilarCamerasStatus, (state, action) => {
      state.similarCamerasFetchStatus = action.payload;
    });
});
