import {cameras} from './cameras';
import {fetchCamerasAction} from '../api-actions/api-actions-cameras/api-actions-cameras';

import {LoadingStatus} from '../../utils/const';
import {getFakeCameras, UNKNOWN_TYPE} from '../../utils/mocks';
import {AppCameras} from '../../types/state';

const fakeCameras = getFakeCameras();
const state: AppCameras = {cameras: [], camerasFetchStatus: LoadingStatus.Default};

describe('reducer cameras', () => {
  it('without values should return initial values', () => {
    expect(cameras.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(cameras.reducer(state, {type: fetchCamerasAction.pending.type}))
      .toEqual({cameras: [], camerasFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(cameras.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({cameras: fakeCameras, camerasFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected', () => {
    expect(cameras.reducer(state, {type: fetchCamerasAction.rejected.type}))
      .toEqual({cameras: [], camerasFetchStatus: LoadingStatus.Error});
  });
});
