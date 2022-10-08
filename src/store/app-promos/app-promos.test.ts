import {LoadingStatus} from '../../utils/const';
import {makeFakePromo} from '../../utils/mocks';
import {appPromos} from './app-promos';
import {fetchPromosAction} from '../api-actions/api-actions-promo';

const promos = [makeFakePromo()];

describe('reducer app-promos', () => {
  const state = {promos: [], promosFetchStatus: LoadingStatus.Default};

  it('without values should return initial values', () => {
    expect(appPromos.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(appPromos.reducer(state, {type: fetchPromosAction.pending.type}))
      .toEqual({promos: [], promosFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(appPromos.reducer(state, {type: fetchPromosAction.fulfilled.type, payload: promos}))
      .toEqual({promos, promosFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected', () => {
    expect(appPromos.reducer(state, {type: fetchPromosAction.rejected.type}))
      .toEqual({promos: [], promosFetchStatus: LoadingStatus.Error});
  });
});
