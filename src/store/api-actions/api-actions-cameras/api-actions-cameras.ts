import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {Camera, Cameras} from '../../../types/camera';
import {AppDispatch, State} from '../../../types/state';

import {UrlRoute} from '../../../utils/const';
import {setCamerasTotalCount} from '../../process/process';


export const fetchCamerasAction = createAsyncThunk<Cameras, {
  limit: number,
  startIndex: number, //TODO вынести
  url?: string,
  //TODO передавать url
}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'cameras/fetchCameras',
  async ({limit, startIndex, url }, {dispatch, extra: api}) => {
    let finishUrl;
    const baseUrl = `${UrlRoute.Base}${UrlRoute.Cameras}?`;//TODO naming
    const limitUrl = `${UrlRoute.Start}=${startIndex}&${UrlRoute.Limit}=${limit}`;

    if (url) {
      finishUrl = `${baseUrl}${url}&${limitUrl}`;
    } else {
      finishUrl = `${baseUrl}${limitUrl}`;
    }

    const response = await api.get<Cameras>(finishUrl);
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

