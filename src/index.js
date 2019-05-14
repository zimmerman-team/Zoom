import React from 'react';
import ReactDOM, { hydrate, render } from 'react-dom';
import './index.css';
import App from 'App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory as createHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import createEncryptor from 'redux-persist-transform-encrypt';

import reducers from 'services/reducers';
import mutationReducers from 'services/reducers/mutation';
import syncReducers from 'services/reducers/sync';
import sagas from 'services/sagas';
import generalReducers from 'services/reducers/general';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      stateSanitizer: process.env.NODE_ENV !== 'development'
    })
  : compose;

const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key',
  onError: error => {
    // Handle the error
  }
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['open', 'user'],
  transforms: [encryptor]
};

const store = createStore(
  persistReducer(
    persistConfig,
    combineReducers({
      ...reducers,
      ...mutationReducers,
      ...syncReducers,
      ...generalReducers
    })
  ),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

const persistor = persistStore(store);

sagaMiddleware.run(sagas);

/*const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    rootElement
  );
}*/

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

console.log('ZOOM V1.3.5');
