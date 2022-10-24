import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {Cameras} from '../../../types/camera';
import {AppDispatch, State} from '../../../types/state';
import {QueryRoute, ServerAdaptValue, SortingType, UrlRoute} from '../../../utils/const';
import {getParams} from '../../../utils/utils';


export const fetchPricesAction = createAsyncThunk<{minPrice: number, maxPrice: number}, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'filterCameras/fetchPrices',
  async (_arg, {getState, extra: api}) => {
    const state = getState();

    const params = getParams(state, undefined, true);
    const response = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params: params});
    const cameras = response.data;

    const minPrice = cameras[0].price;
    const maxPrice = cameras[cameras.length - 1].price;
    return {minPrice, maxPrice};
  },
);

export const fetchLowPriceAction = createAsyncThunk<{lowPrice: number | ''}, {value: number | ''}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'filterCameras/fetchLowPrice',
  async ({value}, {getState, extra: api}) => {
    if (value === '' || value === 0) {
      return {lowPrice: ''};
    }

    const params = {
      [QueryRoute.Sort]: SortingType.Price,
      [QueryRoute.Order]: ServerAdaptValue.OrderDown,
      [QueryRoute.LowPrice]: getState().FILTER_CAMERAS.minPrice,
      [QueryRoute.HighPrice]: value,
    };

    const {data} = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params});
    const lowPrice = data[0].price;
    return {lowPrice};
  },
);

export const fetchHighPriceAction = createAsyncThunk<{highPrice: number | ''}, {value: number | ''}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'filterCameras/fetchHighPrice',
  async ({value}, {getState, extra: api}) => {
    if (value === '' || value === 0) {
      return {highPrice: ''};
    }

    const params = {
      [QueryRoute.Sort]: SortingType.Price,
      [QueryRoute.Order]: ServerAdaptValue.OrderUp,
      [QueryRoute.LowPrice]: value,
      [QueryRoute.HighPrice]: getState().FILTER_CAMERAS.maxPrice,
    };

    const {data} = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params});
    const highPrice = data[0].price;
    return {highPrice};
  },
);
