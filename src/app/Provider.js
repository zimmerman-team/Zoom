import React from 'react';

import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { CookiesProvider } from 'react-cookie';

import reducers from 'services/reducers';
import mutationReducers from 'services/reducers/mutation';
import syncReducers from 'services/reducers/sync';
import sagas from 'services/sagas';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ...reducers,
    ...mutationReducers,
    ...syncReducers
  }),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

sagaMiddleware.run(sagas);

const ProviderWrapper = ({ children }) => (
  <CookiesProvider>
    <Provider store={store}>{children}</Provider>
  </CookiesProvider>
);

export default ProviderWrapper;
