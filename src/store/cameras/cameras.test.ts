import {cameras} from './cameras';
import {fetchCamerasAction, fetchSearchCamerasAction} from '../api-actions/api-actions-cameras/api-actions-cameras';

import {LoadingStatus} from '../../utils/const';
import {getFakeCameras, UNKNOWN_TYPE} from '../../utils/mocks';
import {AppCameras} from '../../types/state';

const fakeCameras = getFakeCameras();
const state: AppCameras = {
  cameras: [],
  camerasFetchStatus: LoadingStatus.Default,
  searchedCameras: [],
  searchedCamerasFetchStatus: LoadingStatus.Default,
};

describe('reducer cameras', () => {
  it('without values should return initial values', () => {
    expect(cameras.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should change loading status when pending fetch cameras', () => {
    expect(cameras.reducer(state, {type: fetchCamerasAction.pending.type}))
      .toEqual({...state, camerasFetchStatus: LoadingStatus.Loading});
  });

  it('should update cameras when cameras were loaded', () => {
    expect(cameras.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, cameras: fakeCameras, camerasFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected fetch cameras', () => {
    expect(cameras.reducer(state, {type: fetchCamerasAction.rejected.type}))
      .toEqual({...state, camerasFetchStatus: LoadingStatus.Error});
  });

  it('should change loading status when pending fetch searched camera', () => {
    expect(cameras.reducer(state, {type: fetchSearchCamerasAction.pending.type}))
      .toEqual({...state, searchedCamerasFetchStatus: LoadingStatus.Loading});
  });

  it('should update searched cameras when searched cameras were loaded', () => {
    expect(cameras.reducer(state, {type: fetchSearchCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, searchedCameras: fakeCameras, searchedCamerasFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected fetch searched cameras', () => {
    expect(cameras.reducer(state, {type: fetchSearchCamerasAction.rejected.type}))
      .toEqual({...state, searchedCamerasFetchStatus: LoadingStatus.Error});
  });
});
