import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import Router from 'containers/Router';
import store from 'store';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
