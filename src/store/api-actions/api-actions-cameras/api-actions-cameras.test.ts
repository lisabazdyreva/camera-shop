import {
  getFakeCamera,
  getFakeCameras, getFakeID, getMockState,
  mockAPI,
  mockStore,
} from '../../../utils/mocks';
import {LoadingStatus, NameSpace, QueryRoute, UrlRoute} from '../../../utils/const';
import {fetchCameraAction, fetchCamerasAction, fetchSearchCamerasAction, fetchSimilarCamerasAction} from './api-actions-cameras';
import {setCamerasTotalCount} from '../../process/process';
import faker from 'faker';

import {cameras} from '../../cameras/cameras';
import {camera} from '../../camera/camera';
import {similarCameras} from '../../similar-cameras/similar-cameras';


const fakeCameras = getFakeCameras();
const fakeCamera = getFakeCamera();
const fakeId = getFakeID();

const FAKE_INDEX = 0;
const FAKE_LIMIT = 9;
const FAKE_TOTAL_COUNT = 10;

const fakeSubstring = faker.datatype.string();

const mockState = getMockState();

describe('async cameras actions', () => {
  it('should dispatch Fetch Cameras', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.Type]: [],
        [QueryRoute.Level]: [],
        [QueryRoute.Category]: [],
        [QueryRoute.LowPrice]: null,
        [QueryRoute.HighPrice]: null,
        [QueryRoute.Start]: FAKE_INDEX,
        [QueryRoute.Limit]: FAKE_LIMIT,
        [QueryRoute.Sort]: null,
        [QueryRoute.Order]: null,
      }})
      .reply(200, fakeCameras, {
        'x-total-count': FAKE_TOTAL_COUNT,
      });

    const store = mockStore(mockState);
    await store.dispatch(fetchCamerasAction({startIndex: FAKE_INDEX}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchCamerasAction.pending.type,
        setCamerasTotalCount.type,
        fetchCamerasAction.fulfilled.type,
      ]);

    expect(cameras.reducer(mockState[NameSpace.Cameras],
      {type: fetchCamerasAction.fulfilled.type}
    ).camerasFetchStatus).toBe(LoadingStatus.Success);
  });

  it('should react when dispatch Fetch Cameras error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.Type]: [],
        [QueryRoute.Level]: [],
        [QueryRoute.Category]: [],
        [QueryRoute.LowPrice]: null,
        [QueryRoute.HighPrice]: null,
        [QueryRoute.Start]: FAKE_INDEX,
        [QueryRoute.Limit]: FAKE_LIMIT,
        [QueryRoute.Sort]: null,
        [QueryRoute.Order]: null,
      }})
      .reply(400);

    const store = mockStore(mockState);
    await store.dispatch(fetchCamerasAction({startIndex: FAKE_INDEX}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.rejected.type,
      ]);

    expect(cameras.reducer(mockState[NameSpace.Cameras],
      {type: fetchCamerasAction.rejected.type}
    ).camerasFetchStatus).toBe(LoadingStatus.Error);

  });

  it('should dispatch Fetch Camera', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}`)
      .reply(200, fakeCamera);

    const store = mockStore(mockState);
    await store.dispatch(fetchCameraAction({id: fakeId}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchCameraAction.pending.type,
        fetchCameraAction.fulfilled.type,
      ]);

    expect(camera.reducer(mockState[NameSpace.Camera],
      {type: fetchCameraAction.fulfilled.type}
    ).cameraFetchStatus).toBe(LoadingStatus.Success);
  });

  it('should react when dispatch Fetch Camera error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}`)
      .reply(400);

    const store = mockStore(mockState);
    await store.dispatch(fetchCameraAction({id: fakeId}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchCameraAction.pending.type,
        fetchCameraAction.rejected.type,
      ]);

    expect(camera.reducer(mockState[NameSpace.Camera],
      {type: fetchCameraAction.rejected.type}
    ).cameraFetchStatus).toBe(LoadingStatus.Error);
  });

  it('should dispatch Fetch Similar Cameras', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}${UrlRoute.Similar}`)
      .reply(200, fakeCameras);

    const store = mockStore(mockState);
    await store.dispatch(fetchSimilarCamerasAction({id: fakeId}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.fulfilled.type,
      ]);

    expect(similarCameras.reducer(mockState[NameSpace.SimilarCameras],
      {type: fetchSimilarCamerasAction.fulfilled.type}
    ).similarCamerasFetchStatus).toBe(LoadingStatus.Success);
  });

  it('should react when dispatch Fetch Similar Cameras error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}${UrlRoute.Similar}`)
      .reply(400);

    const store = mockStore(mockState);
    await store.dispatch(fetchSimilarCamerasAction({id: fakeId}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.rejected.type,
      ]);

    expect(similarCameras.reducer(mockState[NameSpace.SimilarCameras],
      {type: fetchSimilarCamerasAction.rejected.type}
    ).similarCamerasFetchStatus).toBe(LoadingStatus.Error);
  });

  it('should dispatch Fetch Search Cameras', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.NameLike]: fakeSubstring,
      }})
      .reply(200, fakeCameras);

    const store = mockStore(mockState);
    await store.dispatch(fetchSearchCamerasAction(fakeSubstring));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchSearchCamerasAction.pending.type,
        fetchSearchCamerasAction.fulfilled.type,
      ]);

    expect(cameras.reducer(mockState[NameSpace.Cameras],
      {type: fetchSearchCamerasAction.fulfilled.type}
    ).searchedCamerasFetchStatus).toBe(LoadingStatus.Success);
  });

  it ('should react when dispatch Fetch Search Cameras error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.NameLike]: fakeSubstring,
      }})
      .reply(400, fakeCameras);

    const store = mockStore(mockState);
    await store.dispatch(fetchSearchCamerasAction(fakeSubstring));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchSearchCamerasAction.pending.type,
        fetchSearchCamerasAction.rejected.type,
      ]);

    expect(cameras.reducer(mockState[NameSpace.Cameras],
      {type: fetchSearchCamerasAction.rejected.type}
    ).searchedCamerasFetchStatus).toBe(LoadingStatus.Error);
  });
});
