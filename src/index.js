import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate, render } from 'react-dom';
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

import reducers from 'services/reducers';
import mutationReducers from 'services/reducers/mutation';
import syncReducers from 'services/reducers/sync';
import sagas from 'services/sagas';
import generalReducers from 'services/reducers/general';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['userPersist']
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

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

/*const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(  <Provider store={store}><App /></Provider>, rootElement);
} else {
  render(  <Provider store={store}><App /></Provider>, rootElement);
}*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

console.log('ZOOM V1.2.3');
