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
import { fetchHeroes } from './actions/fetch';
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers({
    fetch,
    routing: routerReducer
  }),
  applyMiddleware(thunk, loggerMiddleware),
);

store.dispatch(fetchHeroes());

const history = syncHistoryWithStore(browserHistory, store)

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to="/">Home Page</Link></p>
      </div>
    )
  }
}

ReactDom.render(
  <Provider store={ store }>
    <Router history= { history }>
      <Route path="/" component={ App }>
        <Route path="heroes" component={ HeroPage } />
        <Route path="hero/:id" component={ HeroDesc } />
      </Route>
      <Route path="*" component={ PageNotFound } />
    </Router>
  </Provider>,
  document.getElementById('marvel')
);
