import {createSlice} from '@reduxjs/toolkit';

import {AppSimilarCameras} from '../../types/state';
import {LoadingStatus, NameSpace} from '../../utils/const';

import {fetchSimilarCamerasAction} from '../api-actions/api-actions-cameras/api-actions-cameras';

export const initialStateSimilarCameras: AppSimilarCameras = {
  similarCameras: [],
  similarCamerasFetchStatus: LoadingStatus.Default,
};

export const similarCameras = createSlice({
  name: NameSpace.SimilarCameras,
  initialState: initialStateSimilarCameras,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.similarCamerasFetchStatus = LoadingStatus.Loading;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.similarCamerasFetchStatus = LoadingStatus.Success;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.similarCamerasFetchStatus = LoadingStatus.Error;
      });
  },
});
