import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {Cameras} from '../../../types/camera';
import {AppDispatch, State} from '../../../types/state';
import {QueryRoute, UrlRoute} from '../../../utils/const';


export const fetchPricesAction = createAsyncThunk<{minPrice: number, maxPrice: number}, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'filterCameras/fetchPrices',
  async (_arg, {getState, extra: api}) => {
    const state = getState();

    const params = {
      [QueryRoute.Sort]: 'price',
      [QueryRoute.Type]: state.FILTER_CAMERAS.currentFilterType,
      [QueryRoute.Level]: state.FILTER_CAMERAS.currentFilterLevel,
      [QueryRoute.Category]: state.FILTER_CAMERAS.currentFilterCategory,
      [QueryRoute.LowPrice]: state.FILTER_CAMERAS.lowPrice === '' || state.FILTER_CAMERAS.lowPrice === 0 ? null : state.FILTER_CAMERAS.lowPrice, // TODO check нужно ли
      [QueryRoute.HighPrice]: state.FILTER_CAMERAS.highPrice === '' || state.FILTER_CAMERAS.highPrice === 0 ? null : state.FILTER_CAMERAS.highPrice, // || state.FILTER_CAMERAS.maxPrice
    };
    const response = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}?`, {params});
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
    if (value === '') {
      return {lowPrice: value};
    }
    const min = getState().FILTER_CAMERAS.minPrice;

    const baseUrl = `${UrlRoute.Base}${UrlRoute.Cameras}?_sort=price&_order=desc`;
    const url = `&price_gte=${min}&price_lte=${value}`;
    const {data} = await api.get<Cameras>(`${baseUrl}${url}`);
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
    if (value === '') {
      return {highPrice: value};
    }
    const max = getState().FILTER_CAMERAS.maxPrice;

    const baseUrl = `${UrlRoute.Base}${UrlRoute.Cameras}?_sort=price&_order=asc&`;
    const url = `price_gte=${value}&price_lte=${max}`;
    const {data} = await api.get<Cameras>(`${baseUrl}${url}`);
    const highPrice = data[0].price;
    return {highPrice};
  },
);
