import {appCamera} from './app-camera';
import {LoadingStatus} from '../../utils/const';
import {makeFakeCamera} from '../../utils/mocks';
import {fetchCameraAction} from '../api-actions/api-actions-cameras';

const camera = makeFakeCamera();

describe('reducer app-camera', () => {

  const state = {camera: null, cameraFetchStatus: LoadingStatus.Default};

  it('without values should return initial values', () => {
    expect(appCamera.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(appCamera.reducer(state, {type: fetchCameraAction.pending.type}))
      .toEqual({camera: null, cameraFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(appCamera.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: camera}))
      .toEqual({camera, cameraFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected', () => {
    expect(appCamera.reducer(state, {type: fetchCameraAction.rejected.type}))
      .toEqual({camera: null, cameraFetchStatus: LoadingStatus.Error});
  });
});
