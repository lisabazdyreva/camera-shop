import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../../types/action';
import {Camera, Review} from '../../types/types';
import {LoadingStatus} from '../../types/const';

export const setCameras = createAction(
  ActionType.SetCameras,
  (data: Camera[]) => ({
    payload: data,
  })
);

export const setCamera = createAction(
  ActionType.SetCamera,
  (data: Camera) => ({
    payload: data,
  })
);

export const setReviews = createAction(
  ActionType.SetReviews,
  (data: Review[]) => ({
    payload: data,
  })
);

export const setSimilarCameras = createAction(
  ActionType.SetSimilarCameras,
  (data: Camera[]) => ({
    payload: data,
  })
);

export const setFetchCamerasStatus = createAction(
  ActionType.SetFetchCamerasStatus,
  (status: typeof LoadingStatus[keyof typeof LoadingStatus]) => ({
    payload: status,
  })
);

export const setFetchCameraStatus = createAction(
  ActionType.SetFetchCameraStatus,
  (status: typeof LoadingStatus[keyof typeof LoadingStatus]) => ({
    payload: status,
  })
);

export const setFetchReviewsStatus = createAction(
  ActionType.SetFetchReviewsStatus,
  (status: typeof LoadingStatus[keyof typeof LoadingStatus]) => ({
    payload: status,
  })
);

export const setFetchSimilarCamerasStatus = createAction(
  ActionType.SetFetchSimilarCamerasStatus,
  (status: typeof LoadingStatus[keyof typeof LoadingStatus]) => ({
    payload: status,
  })
);
