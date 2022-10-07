import {State} from '../../types/state';
import {Promos} from '../../types/promo';
import {LoadingStatusType} from '../../types/types';

import {NameSpace} from '../../utils/const';

export const getPromos = (state: State): Promos => state[NameSpace.Promos].promos;
export const getPromosFetchStatus = (state: State): LoadingStatusType => state[NameSpace.Promos].promosFetchStatus;
