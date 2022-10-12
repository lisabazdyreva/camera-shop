import {camera} from './camera';
import {fetchCameraAction} from '../api-actions/api-actions-cameras/api-actions-cameras';

import {LoadingStatus} from '../../utils/const';
import {getFakeCamera, UNKNOWN_TYPE} from '../../utils/mocks';
import {AppCamera} from '../../types/state';


const fakeCamera = getFakeCamera();
const state: AppCamera = {camera: null, cameraFetchStatus: LoadingStatus.Default};

describe('reducer camera', () => {
  it('without values should return initial values', () => {
    expect(camera.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(camera.reducer(state, {type: fetchCameraAction.pending.type}))
      .toEqual({camera: null, cameraFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(camera.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: fakeCamera}))
      .toEqual({camera: fakeCamera, cameraFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected', () => {
    expect(camera.reducer(state, {type: fetchCameraAction.rejected.type}))
      .toEqual({camera: null, cameraFetchStatus: LoadingStatus.Error});
  });
});
