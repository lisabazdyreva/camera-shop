import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {Cameras} from '../../../types/camera';
import {AppDispatch, State} from '../../../types/state';
import {UrlRoute} from '../../../utils/const';


export const fetchPricesAction = createAsyncThunk<{lowPrice: number, highPrice: number}, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'filterCameras/fetchPrices',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}?_sort=price`);

    const lowPrice = data[0].price;
    const highPrice = data[data.length - 1].price;
    return {lowPrice, highPrice};
  },
);

export const fetchLowPriceAction = createAsyncThunk<{lowPrice: number}, {value: number, min: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'filterCameras/fetchLowPrice',
  async ({value, min}, {extra: api}) => {
    const baseUrl = `${UrlRoute.Base}${UrlRoute.Cameras}?_sort=price&_order=desc`;
    const url = `&price_gte=${min}&price_lte=${value}`;
    const {data} = await api.get<Cameras>(`${baseUrl}${url}`);
    const lowPrice = data[0].price;
    return {lowPrice};
  },
);

export const fetchHighPriceAction = createAsyncThunk<{highPrice: number}, {value: number, max: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'filterCameras/fetchHighPrice',
  async ({value, max}, {extra: api}) => {
    const baseUrl = `${UrlRoute.Base}${UrlRoute.Cameras}?_sort=price&_order=asc&`;
    const url = `price_gte=${value}&price_lte=${max}`;
    const {data} = await api.get<Cameras>(`${baseUrl}${url}`);
    const highPrice = data[0].price;
    return {highPrice};
  },
);
