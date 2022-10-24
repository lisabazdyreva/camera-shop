import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {Camera, Cameras} from '../../../types/camera';
import {AppDispatch, State} from '../../../types/state';

import {QueryRoute, UrlRoute} from '../../../utils/const';
import {setCamerasTotalCount} from '../../process/process';
import {getParams} from '../../../utils/utils';


export const fetchCamerasAction = createAsyncThunk<Cameras, {startIndex: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'cameras/fetchCameras',
  async ({startIndex }, {getState, dispatch, extra: api}) => {
    const state = getState();
    const params = getParams(state, startIndex);
    const response = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params});

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
    const params = {[QueryRoute.NameLike]: substring};
    const {data} = await api.get<Cameras>(`${UrlRoute.Base}${UrlRoute.Cameras}`, {params});
    return data;
  },
);
