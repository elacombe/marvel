import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import App from './containers/app';
import HeroPage from './components/hero/heropage';
import HeroDesc from './components/hero/herodesc';
import fetch from './reducers/fetch';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

const loggerMiddleware = createLogger();

const store = createStore(
  fetch,
  applyMiddleware(thunk, loggerMiddleware),
);

ReactDom.render(
  <Provider store={ store }>
    <Router history= { hashHistory }>
    <Route path="/" component={ HeroPage } />
    <Route path="/hero/:id" component={ HeroDesc } />
    </Router>
  </Provider>,
  document.getElementById('marvel')
);
