import {LoadingStatus} from '../../utils/const';
import {fetchSimilarCamerasAction} from '../api-actions/api-actions-cameras';
import {appSimilarCameras} from './app-similar-cameras';
import {makeFakeCamera} from '../../utils/mocks';

const similarCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

describe('reducer app-similar-cameras', () => {
  const state = {similarCameras: [], similarCamerasFetchStatus: LoadingStatus.Default};

  it('without values should return initial values', () => {
    expect(appSimilarCameras.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(appSimilarCameras.reducer(state, {type: fetchSimilarCamerasAction.pending.type}))
      .toEqual({similarCameras: [], similarCamerasFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(appSimilarCameras.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras}))
      .toEqual({similarCameras, similarCamerasFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected', () => {
    expect(appSimilarCameras.reducer(state, {type: fetchSimilarCamerasAction.rejected.type}))
      .toEqual({similarCameras: [], similarCamerasFetchStatus: LoadingStatus.Error});
  });
});
