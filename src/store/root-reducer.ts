import {combineReducers} from '@reduxjs/toolkit';
import {appData} from './app-data/app-data';
import {appStatus} from './app-status/app-status';

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  Status = 'STATUS',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData,
  [NameSpace.Status]: appStatus,
  // [NameSpace.App]: ,
});

export type RootState = ReturnType<typeof rootReducer>;
