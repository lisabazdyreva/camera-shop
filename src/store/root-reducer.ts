import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../utils/const';

import {appProcess} from './app-process/app-process';
import {appCameras} from './app-cameras/app-cameras';
import {appCamera} from './app-camera/app-camera';
import {appPromos} from './app-promos/app-promos';
import {appReviews} from './app-reviews/app-reviews';
import {appSimilarCameras} from './app-similar-cameras/app-similar-cameras';


export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Cameras]: appCameras.reducer,
  [NameSpace.Camera]: appCamera.reducer,
  [NameSpace.Promos]: appPromos.reducer,
  [NameSpace.Reviews]: appReviews.reducer,
  [NameSpace.SimilarCameras]: appSimilarCameras.reducer
});
