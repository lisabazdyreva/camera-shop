import {createSlice} from '@reduxjs/toolkit';

import {AppCamera} from '../../types/state';
import {LoadingStatus, NameSpace} from '../../utils/const';

import {fetchCameraAction} from '../api-actions/api-actions-cameras/api-actions-cameras';


export const initialStateCamera: AppCamera = {
  camera: null,
  cameraFetchStatus: LoadingStatus.Default,
};

export const camera = createSlice({
  name: NameSpace.Camera,
  initialState: initialStateCamera,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraAction.pending, (state) => {
        state.cameraFetchStatus = LoadingStatus.Loading;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.cameraFetchStatus = LoadingStatus.Success;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.cameraFetchStatus = LoadingStatus.Error;
      });
  },
});
