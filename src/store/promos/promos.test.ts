import {LoadingStatus} from '../../utils/const';
import {getFakePromo, UNKNOWN_TYPE} from '../../utils/mocks';
import {promos} from './promos';
import {fetchPromosAction} from '../api-actions/api-actions-promo/api-actions-promo';
import {AppPromos} from '../../types/state';

const fakePromos = [getFakePromo()];
const state: AppPromos = {promos: [], promosFetchStatus: LoadingStatus.Default};

describe('reducer promos', () => {
  it('without values should return initial values', () => {
    expect(promos.reducer(void 0, UNKNOWN_TYPE))
      .toEqual(state);
  });

  it('should change loading status when pending', () => {
    expect(promos.reducer(state, {type: fetchPromosAction.pending.type}))
      .toEqual({promos: [], promosFetchStatus: LoadingStatus.Loading});
  });

  it('should update camera when it was loaded', () => {
    expect(promos.reducer(state, {type: fetchPromosAction.fulfilled.type, payload: fakePromos}))
      .toEqual({promos:fakePromos, promosFetchStatus: LoadingStatus.Success});
  });

  it('should change loading status when rejected', () => {
    expect(promos.reducer(state, {type: fetchPromosAction.rejected.type}))
      .toEqual({promos: [], promosFetchStatus: LoadingStatus.Error});
  });
});
