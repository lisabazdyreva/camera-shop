import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../utils/const';

import {process} from './process/process';
import {cameras} from './cameras/cameras';
import {camera} from './camera/camera';
import {promos} from './promos/promos';
import {reviews} from './reviews/reviews';
import {similarCameras} from './similar-cameras/similar-cameras';
import {filterCameras} from './filter-cameras/filter-cameras';


export const rootReducer = combineReducers({
  [NameSpace.App]: process.reducer,
  [NameSpace.Cameras]: cameras.reducer,
  [NameSpace.Camera]: camera.reducer,
  [NameSpace.Promos]: promos.reducer,
  [NameSpace.Reviews]: reviews.reducer,
  [NameSpace.SimilarCameras]: similarCameras.reducer,
  [NameSpace.FilterCameras]: filterCameras.reducer,
});
