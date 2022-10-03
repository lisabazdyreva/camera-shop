import {AppStatus} from '../../types/state';
import {LoadingStatus} from '../../utils/const';
import {createReducer} from '@reduxjs/toolkit';
import {
  setFetchCamerasStatus,
  setFetchCameraStatus, setFetchPromosStatus,
  setFetchReviewsStatus,
  setFetchSimilarCamerasStatus, setPostReviewStatus
} from '../actions/actions';

const initialState: AppStatus = {
  camerasFetchStatus: LoadingStatus.Default,
  cameraFetchStatus: LoadingStatus.Default,
  reviewsFetchStatus: LoadingStatus.Default,
  similarCamerasFetchStatus: LoadingStatus.Default,
  promosFetchStatus: LoadingStatus.Default,
  reviewPostStatus: LoadingStatus.Default,
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
    })
    .addCase(setFetchPromosStatus, (state, action) => {
      state.promosFetchStatus = action.payload;
    })
    .addCase(setPostReviewStatus, (state, action) => {
      state.reviewPostStatus = action.payload;
    });
});
