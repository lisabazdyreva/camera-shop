import {combineReducers} from '@reduxjs/toolkit';
import {appData} from './app-data/app-data';
import {appStatus} from './app-status/app-status';
import {appProcess} from './app-process/app-process';
import {NameSpace} from '../utils/const';


export const rootReducer = combineReducers({
  [NameSpace.Data]: appData,
  [NameSpace.Status]: appStatus,
  [NameSpace.App]: appProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
