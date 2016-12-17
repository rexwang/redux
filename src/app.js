import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as localStore from './localStore';

import App from './components/app';
import Cards from './components/visibleCards';

reducers.routing = routerReducer;

// The second param of createStore is the current state
const store = createStore(combineReducers(reducers), localStore.get());
const history = syncHistoryWithStore(browserHistory, store);

function run() {
  let state = store.getState();
  localStore.set(state, ['decks', 'cards']);

  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/deck/:deckId" component={Cards}></Route>
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('root'));
}

run();

store.subscribe(run);
