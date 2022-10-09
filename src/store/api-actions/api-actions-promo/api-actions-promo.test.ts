import {getFakePromo, mockAPI, mockStore} from '../../../utils/mocks';
import {UrlRoute} from '../../../utils/const';
import {fetchPromosAction} from './api-actions-promo';


const fakePromo = getFakePromo();


describe('async promo action', () => {
  it('should dispatch fetch promo', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Promo}`)
      .reply(200, fakePromo);

    const store = mockStore();
    await store.dispatch(fetchPromosAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        fetchPromosAction.pending.type,
        fetchPromosAction.fulfilled.type,
      ]);
  });

  it('should react when dispatch fetch promo error', async () => {
    mockAPI
      .onGet(`${UrlRoute.Base}${UrlRoute.Promo}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchPromosAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        fetchPromosAction.pending.type,
        fetchPromosAction.rejected.type,
      ]);
  });
});
