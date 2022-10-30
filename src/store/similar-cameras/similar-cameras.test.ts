import {LoadingStatus} from '../../utils/const';
import {fetchSimilarCamerasAction} from '../api-actions/api-actions-cameras/api-actions-cameras';
import {initialStateSimilarCameras, similarCameras} from './similar-cameras';
import {getFakeCameras, UNKNOWN_TYPE} from '../../utils/mocks';
import {AppSimilarCameras} from '../../types/state';

const fakeSimilarCameras = getFakeCameras();
const state: AppSimilarCameras = initialStateSimilarCameras;

describe('reducer similar-cameras', () => {
  it('without values should return initial values', () => {
    expect(similarCameras.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(similarCameras.reducer(state, {type: fetchSimilarCamerasAction.pending.type}))
      .toEqual({similarCameras: [], similarCamerasFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(similarCameras.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: fakeSimilarCameras}))
      .toEqual({similarCameras: fakeSimilarCameras, similarCamerasFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected', () => {
    expect(similarCameras.reducer(state, {type: fetchSimilarCamerasAction.rejected.type}))
      .toEqual({similarCameras: [], similarCamerasFetchStatus: LoadingStatus.Error});
  });
});
