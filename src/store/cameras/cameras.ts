import {createSlice} from '@reduxjs/toolkit';

import {AppCameras} from '../../types/state';
import {LoadingStatus, NameSpace} from '../../utils/const';

import {
  fetchCamerasAction,
  fetchSearchCamerasAction
} from '../api-actions/api-actions-cameras/api-actions-cameras';

const initialState: AppCameras = {
  cameras: [],
  camerasFetchStatus: LoadingStatus.Default,
  searchedCameras: [],
  searchedCamerasFetchStatus: LoadingStatus.Default,
};

export const cameras = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.camerasFetchStatus = LoadingStatus.Loading;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.camerasFetchStatus = LoadingStatus.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.camerasFetchStatus = LoadingStatus.Error;
      })
      .addCase(fetchSearchCamerasAction.pending, (state) => {
        state.searchedCamerasFetchStatus = LoadingStatus.Loading;
      })
      .addCase(fetchSearchCamerasAction.fulfilled, (state, action) => {
        state.searchedCameras = action.payload;
        state.searchedCamerasFetchStatus = LoadingStatus.Success;
      })
      .addCase(fetchSearchCamerasAction.rejected, (state) => {
        state.searchedCamerasFetchStatus = LoadingStatus.Error;
      });
  },
});
