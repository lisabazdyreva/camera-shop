import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {Camera, Cameras} from '../../../types/camera';
import {AppDispatch, State} from '../../../types/state';

import {UrlRoute} from '../../../utils/const';
import {setCamerasTotalCount} from '../../process/process';
import {SortingData} from '../../../types/types';


export const fetchCamerasAction = createAsyncThunk<Cameras, {
  limit: number,
  startIndex: number, //TODO вынести
}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'cameras/fetchCameras',
  async ({limit, startIndex }, {dispatch, extra: api}) => {
    const url = `${UrlRoute.Base}${UrlRoute.Cameras}?${UrlRoute.Start}=${startIndex}&${UrlRoute.Limit}=${limit}`;

    const response = await api.get<Cameras>(url);
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

export const fetchSortingCamerasAction = createAsyncThunk<Cameras, SortingData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'sortCameras/fetchSortingCameras',
  async ({limit, startIndex, sortingType, sortingOrder},
    {extra: api}) => {
    const url = `${UrlRoute.Base}${UrlRoute.Cameras}?${UrlRoute.Sorting}=${sortingType}&${UrlRoute.Order}=${sortingOrder}&${UrlRoute.Start}=${startIndex}&${UrlRoute.Limit}=${limit}`;
    const {data} = await api.get<Cameras>(url);

    return data;
  },
);

