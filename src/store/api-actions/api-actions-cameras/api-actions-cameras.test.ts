import {
  getFakeCamera,
  getFakeCameras, getFakeID,
  mockAPI,
  mockStore,
} from '../../../utils/mocks';
import {UrlRoute} from '../../../utils/const';
import {fetchCameraAction, fetchCamerasAction, fetchSimilarCamerasAction} from './api-actions-cameras';
import {setCamerasTotalCount} from '../../process/process';


const fakeCameras = getFakeCameras();
const fakeCamera = getFakeCamera();
const fakeId = getFakeID();

const FAKE_INDEX = 0;
const FAKE_LIMIT = 10;
const FAKE_TOTAL_COUNT = 10;


describe('async cameras actions', () => {
  it('should dispatch Fetch Cameras', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}?_start=${FAKE_INDEX}&_limit=${FAKE_LIMIT}`)
      .reply(200, fakeCameras, {
        'x-total-count': FAKE_TOTAL_COUNT,
      });

    const store = mockStore();
    await store.dispatch(fetchCamerasAction({startIndex: FAKE_INDEX}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchCamerasAction.pending.type,
        setCamerasTotalCount.type,
        fetchCamerasAction.fulfilled.type,
      ]);
  });

  it('should react when dispatch Fetch Cameras error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}?_start=${FAKE_INDEX}&_limit=${FAKE_LIMIT}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchCamerasAction({startIndex: FAKE_INDEX}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.rejected.type,
      ]);
  });

  it('should dispatch Fetch Camera', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}`)
      .reply(200, fakeCamera);

    const store = mockStore();
    await store.dispatch(fetchCameraAction({id: fakeId}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchCameraAction.pending.type,
        fetchCameraAction.fulfilled.type,
      ]);
  });

  it('should react when dispatch Fetch Camera error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchCameraAction({id: fakeId}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchCameraAction.pending.type,
        fetchCameraAction.rejected.type,
      ]);
  });

  it('should dispatch Fetch Similar Cameras', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}${UrlRoute.Similar}`)
      .reply(200, fakeCameras);

    const store = mockStore();
    await store.dispatch(fetchSimilarCamerasAction({id: fakeId}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.fulfilled.type,
      ]);
  });

  it('should react when dispatch Fetch Similar Cameras error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}/${fakeId}${UrlRoute.Similar}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchSimilarCamerasAction({id: fakeId}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.rejected.type,
      ]);
  });
});
