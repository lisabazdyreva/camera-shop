import {ThunkActionResult} from '../../../types/action';
import {Camera} from '../../../types/types';
import axios, {AxiosResponse} from 'axios';
import {
  setCamera,
  setCameras,
  setFetchCamerasStatus,
  setFetchCameraStatus,
  setFetchSimilarCamerasStatus, setSimilarCameras
} from '../actions';
import {LoadingStatus} from '../../../types/const';

const BASE_URL = 'https://camera-shop.accelerator.pages.academy';


const fetchCameras = (): ThunkActionResult => async (dispatch, _getState): Promise<void> => {
  dispatch(setFetchCamerasStatus(LoadingStatus.Loading));

  await axios.get(`${BASE_URL}/cameras`)
    .then((response: AxiosResponse) => {
      const cameras: Camera[] = response.data;
      dispatch(setCameras(cameras));
      dispatch(setFetchCamerasStatus(LoadingStatus.Success));
    })
    .catch(() => dispatch(setFetchCamerasStatus(LoadingStatus.Error)));
};

const fetchCamera = (id: number): ThunkActionResult => async (dispatch, _getState): Promise<void> => {
  dispatch(setFetchCameraStatus(LoadingStatus.Loading));

  await axios.get(`${BASE_URL}/cameras/${id}`)
    .then((response: AxiosResponse) => {
      const camera: Camera = response.data;
      dispatch(setCamera(camera));
      dispatch(setFetchCameraStatus(LoadingStatus.Success));
    })
    .catch(() => dispatch(setFetchCameraStatus(LoadingStatus.Error)));
};

const fetchSimilarCameras = (id: number): ThunkActionResult => async (dispatch, _setState): Promise<void> => {
  dispatch(setFetchSimilarCamerasStatus(LoadingStatus.Loading));
  await axios.get(`${BASE_URL}/cameras/${id}/similar`)
    .then((response: AxiosResponse) => {
      const similarCameras: Camera[] = response.data;
      dispatch(setSimilarCameras(similarCameras));
      dispatch((setFetchSimilarCamerasStatus(LoadingStatus.Success)));
    })
    .catch(() => dispatch(setFetchSimilarCamerasStatus(LoadingStatus.Error)));
};

export {fetchCameras,fetchCamera, fetchSimilarCameras};
