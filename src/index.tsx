import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
import {fetchCameras} from './store/actions/api-actions/api-actions-cameras';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

export const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(fetchCameras());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
