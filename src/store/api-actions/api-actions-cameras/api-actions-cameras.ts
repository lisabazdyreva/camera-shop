import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {Camera, Cameras} from '../../../types/camera';
import {AppDispatch, State} from '../../../types/state';

import {QueryRoute, Step, UrlRoute} from '../../../utils/const';
import {setCamerasTotalCount} from '../../process/process';


export const fetchCamerasAction = createAsyncThunk<Cameras, {startIndex: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'cameras/fetchCameras',
  async ({startIndex }, {getState, dispatch, extra: api}) => {
    const state = getState();

    const params = {
      [QueryRoute.Start]: startIndex,
      [QueryRoute.Limit]: Step.Pagination,
      [QueryRoute.Sort]: state.APP.currentSortingType,
      [QueryRoute.Order]: state.APP.currentSortingOrder,
      [QueryRoute.Type]: state.FILTER_CAMERAS.currentFilterType,
      [QueryRoute.Level]: state.FILTER_CAMERAS.currentFilterLevel,
      [QueryRoute.Category]: state.FILTER_CAMERAS.currentFilterCategory,
      [QueryRoute.LowPrice]: state.FILTER_CAMERAS.lowPrice === '' || state.FILTER_CAMERAS.lowPrice === 0 ? null : state.FILTER_CAMERAS.lowPrice, // TODO check нужно ли
      [QueryRoute.HighPrice]: state.FILTER_CAMERAS.highPrice === '' || state.FILTER_CAMERAS.highPrice === 0 ? null : state.FILTER_CAMERAS.highPrice, // || state.FILTER_CAMERAS.maxPrice
    };

    const response = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}?`, {params});

    const data = response.data;
    const camerasTotalCount = response.headers['x-total-count'];
    dispatch(setCamerasTotalCount(Number(camerasTotalCount)));
    return data;
  },
);


export const fetchCameraAction = createAsyncThunk<Camera, {id: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'camera/fetchCamera',
  async ({id}, {extra: api}) => {
    const {data} = await api.get<Camera>(`${UrlRoute.Base}${UrlRoute.Cameras}/${id}`);
    return data;
  },
);


export const fetchSimilarCamerasAction = createAsyncThunk<Cameras, {id: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'similarCameras/fetchSimilarCameras',
  async ({id}, {extra: api}) => {
    const {data} = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}/${id}${UrlRoute.Similar}`);
    return data;
  },
);


export const fetchSearchCamerasAction = createAsyncThunk<Cameras, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'searchCameras/fetchSearchCameras',
  async (substring, {extra: api}) => {
    const {data} = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}?name_like=${substring}`);
    return data;
  },
);

//getSTATE todo
