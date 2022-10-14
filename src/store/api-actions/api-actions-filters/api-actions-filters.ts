import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {Cameras} from '../../../types/camera';
import {AppDispatch, State} from '../../../types/state';
import {UrlRoute} from '../../../utils/const';
import {setCamerasTotalCount} from '../../process/process';

export const fetchCategoryCameraAction = createAsyncThunk<Cameras, {
  limit: number,
  startIndex: number,
  filters: any,//TODO
}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'filterCameras/fetchCategoryCameras',
  async ({limit, startIndex, filters}, {dispatch, extra: api}) => {
    const filterUrl = filters.map(({filterName, values}: any) => values.map((value: any, index: any) => {
      if (index === 0) {
        return `${filterName}=${value}`;
      }
      return `&${filterName}=${value}`;
    }).join('')).join('&');

    const url = `${UrlRoute.Base}${UrlRoute.Cameras}?${filterUrl}&${UrlRoute.Start}=${startIndex}&${UrlRoute.Limit}=${limit}`;

    const response = await api.get<Cameras>(url);
    const camerasTotalCount = response.headers['x-total-count'];
    const data = response.data;

    dispatch(setCamerasTotalCount(Number(camerasTotalCount)));
    return data;
  },
);


// export const fetchCategoryCameraAction = createAsyncThunk<Cameras, {
//   limit: number,
//   startIndex: number,
//   category: string,
//   filterType: string,
// }, {
//   dispatch: AppDispatch,
//   state: State,
//   extra: AxiosInstance
// }>(
//   'filterCameras/fetchTypeAndCategoryCameras',
