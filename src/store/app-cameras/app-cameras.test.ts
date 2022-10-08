import {appCameras} from './app-cameras';
import {LoadingStatus} from '../../utils/const';
import {fetchCamerasAction} from '../api-actions/api-actions-cameras';
import {makeFakeCamera} from '../../utils/mocks';

const cameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

describe('reducer app-cameras', () => {
  const state = {cameras: [], camerasFetchStatus: LoadingStatus.Default};

  it('without values should return initial values', () => {
    expect(appCameras.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(appCameras.reducer(state, {type: fetchCamerasAction.pending.type}))
      .toEqual({cameras: [], camerasFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(appCameras.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: cameras}))
      .toEqual({cameras, camerasFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected', () => {
    expect(appCameras.reducer(state, {type: fetchCamerasAction.rejected.type}))
      .toEqual({cameras: [], camerasFetchStatus: LoadingStatus.Error});
  });

});
