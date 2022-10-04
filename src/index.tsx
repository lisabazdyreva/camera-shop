import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
import {fetchCameras} from './store/actions/api-actions/api-actions-cameras';
import {Provider} from 'react-redux';
import {fetchPromos} from './store/actions/api-actions/api-actions-promo';
import {HistoryRoute} from './components/common/common';
import browserHistory from './browser-history';
import {createAPI} from './services/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
  )
});

store.dispatch(fetchCameras());
store.dispatch(fetchPromos());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRoute history={browserHistory}>
        <App />
      </HistoryRoute>
    </Provider>
  </React.StrictMode>,
);
