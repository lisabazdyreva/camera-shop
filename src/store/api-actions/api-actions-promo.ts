import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {Promo, Promos} from '../../types/promo';
import {AppDispatch, State} from '../../types/state';
import {UrlRoute} from '../../utils/const';

export const fetchPromosAction = createAsyncThunk<Promos, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'promos/fetchPromos',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Promos | Promo>(`${UrlRoute.Base}${UrlRoute.Promo}`);

    return Array.isArray(data) ? data : [data];
  },
);
