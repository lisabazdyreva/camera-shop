import {getFakeCameras, getMockState, mockAPI, mockStore} from '../../../utils/mocks';
import {QueryRoute, ServerAdaptValue, SortingType, UrlRoute} from '../../../utils/const';
import {fetchHighPriceAction, fetchLowPriceAction, fetchPricesAction} from './api-actions-filters';

const fakeCameras = getFakeCameras();
const mockState = getMockState();

describe('async filters actions', () => {
  it ('should dispatch Fetch Prices', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.Type]: [],
        [QueryRoute.Level]: [],
        [QueryRoute.Category]: [],
        [QueryRoute.Sort]: SortingType.Price,
      }})
      .reply(200, fakeCameras);

    const store = mockStore(mockState);
    await store.dispatch(fetchPricesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchPricesAction.pending.type,
        fetchPricesAction.fulfilled.type,
      ]);
  });

  it ('should react when dispatch Fetch Prices error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.Type]: [],
        [QueryRoute.Level]: [],
        [QueryRoute.Category]: [],
        [QueryRoute.Sort]: SortingType.Price,
      }})
      .reply(400);

    const store = mockStore(mockState);
    await store.dispatch(fetchPricesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchPricesAction.pending.type,
        fetchPricesAction.rejected.type,
      ]);
  });

  it ('should dispatch Fetch Low Price', async () => {
    const fakeHighPrice = 10;
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.Sort]: SortingType.Price,
        [QueryRoute.Order]: ServerAdaptValue.OrderDown,
        [QueryRoute.LowPrice]: 0,
        [QueryRoute.HighPrice]: fakeHighPrice,
      }})
      .reply(200, fakeCameras);

    const store = mockStore(mockState);
    await store.dispatch(fetchLowPriceAction({value: fakeHighPrice}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchLowPriceAction.pending.type,
        fetchLowPriceAction.fulfilled.type,
      ]);
  });

  it ('should react when dispatch Fetch Low Price error', async () => {
    const fakeHighPrice = 10;
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.Sort]: SortingType.Price,
        [QueryRoute.Order]: ServerAdaptValue.OrderDown,
        [QueryRoute.LowPrice]: 0,
        [QueryRoute.HighPrice]: fakeHighPrice,
      }})
      .reply(400);

    const store = mockStore(mockState);
    await store.dispatch(fetchLowPriceAction({value: fakeHighPrice}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchLowPriceAction.pending.type,
        fetchLowPriceAction.rejected.type,
      ]);
  });
  it ('should dispatch Fetch High Price', async () => {
    const fakeLowPrice = 0;
    const fakeHighPrice = 0;
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.Sort]: SortingType.Price,
        [QueryRoute.Order]: ServerAdaptValue.OrderUp,
        [QueryRoute.LowPrice]: fakeLowPrice,
        [QueryRoute.HighPrice]: fakeHighPrice,
      }})
      .reply(200, fakeCameras);

    const store = mockStore(mockState);
    await store.dispatch(fetchHighPriceAction({value: fakeHighPrice}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchHighPriceAction.pending.type,
        fetchHighPriceAction.fulfilled.type,
      ]);
  });

  it ('should react when dispatch Fetch High Price error', async () => {
    const fakeLowPrice = 0;
    const fakeHighPrice = 10;

    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: {
        [QueryRoute.Sort]: SortingType.Price,
        [QueryRoute.Order]: ServerAdaptValue.OrderUp,
        [QueryRoute.LowPrice]: fakeLowPrice,
        [QueryRoute.HighPrice]: fakeHighPrice,
      }})
      .reply(400);

    const store = mockStore(mockState);
    await store.dispatch(fetchHighPriceAction({value: fakeHighPrice}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions)
      .toEqual([
        fetchHighPriceAction.pending.type,
        fetchHighPriceAction.rejected.type,
      ]);
  });
});
