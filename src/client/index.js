import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './containers/app';
import fetch from './reducers/fetch';
import { fetchHeroes } from './actions/fetch';

const loggerMiddleware = createLogger();

const store = createStore(
  fetch,
  applyMiddleware(thunk, loggerMiddleware),
);

store.dispatch(fetchHeroes());

ReactDom.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('marvel')
);
