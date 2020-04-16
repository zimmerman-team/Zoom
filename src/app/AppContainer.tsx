// @ts-nocheck
/* eslint-disable */

import React from "react";
import App from "./App";

import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createBrowserHistory as createHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import createEncryptor from "redux-persist-transform-encrypt";

import reducers from "app/services/reducers";
import mutationReducers from "app/services/reducers/mutation";
import syncReducers from "app/services/reducers/sync";
import authNodeReducers from "app/services/reducers/authNodeBackend";
import sagas from "app/services/sagas";
import generalReducers from "app/services/reducers/general";

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      stateSanitizer: process.env.NODE_ENV !== "development",
    })
  : compose;

const encryptor = createEncryptor({
  secretKey: "my-super-secret-key",
  onError: (error) => {
    // Handle the error
  },
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["open", "user", "currentUser"],
  transforms: [encryptor],
};

const store = createStore(
  persistReducer(
    persistConfig,
    combineReducers({
      ...reducers,
      ...mutationReducers,
      ...syncReducers,
      ...generalReducers,
      ...authNodeReducers,
    })
  ),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export const AppContainer = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
