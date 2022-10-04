import axios, {AxiosInstance} from 'axios';
import {UrlRoute} from '../utils/const';

const BASE_URL = UrlRoute.Base;
const TIMEOUT = 10000;

export const createAPI = (): AxiosInstance => axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});


