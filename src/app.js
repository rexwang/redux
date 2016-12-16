import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import App from './components/app';
import Sidebar from './components/sidebar';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers));
const history = syncHistoryWithStore(browserHistory, store);

function run() {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}></Route>
      </Router>
    </Provider>
  ), document.getElementById('root'));
}

run();

store.subscribe(run);
