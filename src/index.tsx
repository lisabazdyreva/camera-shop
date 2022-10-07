import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {HistoryRoute} from './components/common/common';
import browserHistory from './browser-history';
import {store} from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRoute history={browserHistory}>
        <App />
      </HistoryRoute>
    </Provider>
  </React.StrictMode>,
);
